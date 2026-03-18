const db = require('../config/database');
const { body, validationResult } = require('express-validator');

/**
 * GET /api/admin/dashboard
 * Get dashboard statistics for clinic
 */
exports.getDashboardStats = async (req, res) => {
  try {
    const { clinicId } = req.query;
    
    if (!clinicId) {
      return res.status(400).json({
        success: false,
        message: 'Clinic ID required'
      });
    }

    // Total Patients for clinic
    const [patientCount] = await db.execute(`
      SELECT COUNT(DISTINCT u.id) as count 
      FROM appointments a
      JOIN users u ON a.user_id = u.id
      WHERE a.clinic_id = ?
    `, [clinicId]);

    // Total Appointments
    const [appointmentCount] = await db.execute(`
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN status = 'confirmed' THEN 1 ELSE 0 END) as confirmed,
        SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending,
        SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed
      FROM appointments 
      WHERE clinic_id = ?
    `, [clinicId]);

    // Revenue (sum of appointment fees)
    const [revenueData] = await db.execute(`
      SELECT 
        COALESCE(SUM(fee), 0) as totalRevenue,
        COALESCE(AVG(fee), 0) as avgFee
      FROM appointments 
      WHERE clinic_id = ? AND status = 'completed'
    `, [clinicId]);

    // Active Doctors
    const [doctorCount] = await db.execute(`
      SELECT COUNT(*) as count 
      FROM doctors 
      WHERE clinic_id = ?
    `, [clinicId]);

    // Recent appointments
    const [recentAppointments] = await db.execute(`
      SELECT 
        a.id,
        u.name as patientName,
        d.name as doctorName,
        a.appointment_date,
        a.appointment_time,
        a.status,
        a.fee
      FROM appointments a
      JOIN users u ON a.user_id = u.id
      JOIN doctors d ON a.doctor_id = d.id
      WHERE a.clinic_id = ?
      ORDER BY a.appointment_date DESC, a.appointment_time DESC
      LIMIT 10
    `, [clinicId]);

    res.json({
      success: true,
      data: {
        totalPatients: patientCount[0]?.count || 0,
        totalAppointments: appointmentCount[0]?.total || 0,
        confirmedAppointments: appointmentCount[0]?.confirmed || 0,
        pendingAppointments: appointmentCount[0]?.pending || 0,
        completedAppointments: appointmentCount[0]?.completed || 0,
        totalRevenue: revenueData[0]?.totalRevenue || 0,
        averageFee: revenueData[0]?.avgFee || 0,
        totalDoctors: doctorCount[0]?.count || 0,
        recentAppointments: recentAppointments || []
      }
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard stats',
      error: error.message
    });
  }
};

/**
 * GET /api/admin/patients
 * Get all patients for clinic
 */
exports.getPatients = async (req, res) => {
  try {
    const { clinicId, search = '', page = 1 } = req.query;
    const limit = 10;
    const offset = (page - 1) * limit;

    if (!clinicId) {
      return res.status(400).json({
        success: false,
        message: 'Clinic ID required'
      });
    }

    // Get distinct patients for clinic
    let query = `
      SELECT DISTINCT 
        u.id,
        u.name,
        u.phone,
        u.email,
        COUNT(a.id) as totalVisits,
        MAX(a.appointment_date) as lastVisit
      FROM users u
      LEFT JOIN appointments a ON a.user_id = u.id AND a.clinic_id = ?
      WHERE a.clinic_id = ?
    `;

    let countQuery = `
      SELECT COUNT(DISTINCT u.id) as total
      FROM users u
      LEFT JOIN appointments a ON a.user_id = u.id AND a.clinic_id = ?
      WHERE a.clinic_id = ?
    `;

    const params = [clinicId, clinicId];

    if (search) {
      query += ` AND (u.name LIKE ? OR u.email LIKE ? OR u.phone LIKE ?)`;
      countQuery += ` AND (u.name LIKE ? OR u.email LIKE ? OR u.phone LIKE ?)`;
      const searchPattern = `%${search}%`;
      params.push(searchPattern, searchPattern, searchPattern);
    }

    query += ` GROUP BY u.id, u.name, u.phone, u.email LIMIT ? OFFSET ?`;
    params.push(limit, offset);

    const [patients] = await db.execute(query, params);
    
    // Get total count
    const [countResult] = await db.execute(countQuery, params.slice(0, -2));
    const total = countResult[0]?.total || 0;

    res.json({
      success: true,
      data: {
        patients,
        pagination: {
          page: parseInt(page),
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get patients error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch patients',
      error: error.message
    });
  }
};

/**
 * GET /api/admin/appointments
 * Get all appointments for clinic
 */
exports.getAppointments = async (req, res) => {
  try {
    const { clinicId, status = '', doctorId = '', page = 1 } = req.query;
    const limit = 10;
    const offset = (page - 1) * limit;

    if (!clinicId) {
      return res.status(400).json({
        success: false,
        message: 'Clinic ID required'
      });
    }

    let query = `
      SELECT 
        a.id,
        a.appointment_date,
        a.appointment_time,
        a.status,
        a.fee,
        a.notes,
        u.name as patientName,
        u.email as patientEmail,
        u.phone as patientPhone,
        d.name as doctorName,
        d.specialization
      FROM appointments a
      JOIN users u ON a.user_id = u.id
      JOIN doctors d ON a.doctor_id = d.id
      WHERE a.clinic_id = ?
    `;

    let countQuery = `
      SELECT COUNT(*) as total FROM appointments 
      WHERE clinic_id = ?
    `;

    const params = [clinicId];

    if (status) {
      query += ` AND a.status = ?`;
      countQuery += ` AND status = ?`;
      params.push(status);
    }

    if (doctorId) {
      query += ` AND a.doctor_id = ?`;
      countQuery += ` AND doctor_id = ?`;
      params.push(doctorId);
    }

    query += ` ORDER BY a.appointment_date DESC, a.appointment_time DESC LIMIT ? OFFSET ?`;
    params.push(limit, offset);

    const [appointments] = await db.execute(query, params);
    
    // Get total count
    const countParams = params.slice(0, -2);
    const [countResult] = await db.execute(countQuery, countParams);
    const total = countResult[0]?.total || 0;

    res.json({
      success: true,
      data: {
        appointments,
        pagination: {
          page: parseInt(page),
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get appointments error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch appointments',
      error: error.message
    });
  }
};

/**
 * PUT /api/admin/appointments/:appointmentId
 * Update appointment status
 */
exports.updateAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const { status, notes } = req.body;

    if (!appointmentId) {
      return res.status(400).json({
        success: false,
        message: 'Appointment ID required'
      });
    }

    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Status required'
      });
    }

    const validStatuses = ['pending', 'confirmed', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
    }

    const updateQuery = `
      UPDATE appointments 
      SET status = ?, notes = ? 
      WHERE id = ?
    `;

    await db.execute(updateQuery, [status, notes || null, appointmentId]);

    // Fetch updated appointment
    const [appointment] = await db.execute(`
      SELECT * FROM appointments WHERE id = ?
    `, [appointmentId]);

    res.json({
      success: true,
      data: appointment[0]
    });
  } catch (error) {
    console.error('Update appointment error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update appointment',
      error: error.message
    });
  }
};

/**
 * DELETE /api/admin/appointments/:appointmentId
 * Delete appointment
 */
exports.deleteAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    if (!appointmentId) {
      return res.status(400).json({
        success: false,
        message: 'Appointment ID required'
      });
    }

    await db.execute(`
      DELETE FROM appointments WHERE id = ?
    `, [appointmentId]);

    res.json({
      success: true,
      message: 'Appointment deleted successfully'
    });
  } catch (error) {
    console.error('Delete appointment error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete appointment',
      error: error.message
    });
  }
};

/**
 * GET /api/admin/clinic-settings
 * Get clinic settings
 */
exports.getClinicSettings = async (req, res) => {
  try {
    const { clinicId } = req.query;

    if (!clinicId) {
      return res.status(400).json({
        success: false,
        message: 'Clinic ID required'
      });
    }

    const [clinic] = await db.execute(`
      SELECT * FROM clinics WHERE id = ?
    `, [clinicId]);

    if (clinic.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Clinic not found'
      });
    }

    res.json({
      success: true,
      data: clinic[0]
    });
  } catch (error) {
    console.error('Get clinic settings error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch clinic settings',
      error: error.message
    });
  }
};

/**
 * PUT /api/admin/clinic-settings/:clinicId
 * Update clinic settings
 */
exports.updateClinicSettings = async (req, res) => {
  try {
    const { clinicId } = req.params;
    const { name, phone, email, address, description, primary_color, secondary_color } = req.body;

    if (!clinicId) {
      return res.status(400).json({
        success: false,
        message: 'Clinic ID required'
      });
    }

    const updates = [];
    const params = [];

    if (name) {
      updates.push('name = ?');
      params.push(name);
    }
    if (phone) {
      updates.push('phone = ?');
      params.push(phone);
    }
    if (email) {
      updates.push('email = ?');
      params.push(email);
    }
    if (address) {
      updates.push('address = ?');
      params.push(address);
    }
    if (description) {
      updates.push('description = ?');
      params.push(description);
    }
    if (primary_color) {
      updates.push('primary_color = ?');
      params.push(primary_color);
    }
    if (secondary_color) {
      updates.push('secondary_color = ?');
      params.push(secondary_color);
    }

    if (updates.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No fields to update'
      });
    }

    params.push(clinicId);

    const query = `UPDATE clinics SET ${updates.join(', ')} WHERE id = ?`;
    await db.execute(query, params);

    // Fetch updated clinic
    const [clinic] = await db.execute(`SELECT * FROM clinics WHERE id = ?`, [clinicId]);

    res.json({
      success: true,
      data: clinic[0]
    });
  } catch (error) {
    console.error('Update clinic settings error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update clinic settings',
      error: error.message
    });
  }
};

/**
 * GET /api/admin/doctors
 * Get all doctors for clinic
 */
exports.getDoctors = async (req, res) => {
  try {
    const { clinicId } = req.query;

    if (!clinicId) {
      return res.status(400).json({
        success: false,
        message: 'Clinic ID required'
      });
    }

    const [doctors] = await db.execute(`
      SELECT * FROM doctors WHERE clinic_id = ?
    `, [clinicId]);

    res.json({
      success: true,
      data: doctors
    });
  } catch (error) {
    console.error('Get doctors error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch doctors',
      error: error.message
    });
  }
};

/**
 * POST /api/admin/doctors
 * Create new doctor
 */
exports.createDoctor = async (req, res) => {
  try {
    const { clinicId, name, specialization, experience, fee, email, phone } = req.body;

    if (!clinicId || !name) {
      return res.status(400).json({
        success: false,
        message: 'Clinic ID and name are required'
      });
    }

    const [result] = await db.execute(`
      INSERT INTO doctors (clinic_id, name, specialization, experience, fee, email, phone)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [clinicId, name, specialization, experience, fee, email, phone]);

    const [doctor] = await db.execute(`
      SELECT * FROM doctors WHERE id = ?
    `, [result.insertId]);

    res.json({
      success: true,
      data: doctor[0]
    });
  } catch (error) {
    console.error('Create doctor error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create doctor',
      error: error.message
    });
  }
};

/**
 * PUT /api/admin/doctors/:doctorId
 * Update doctor
 */
exports.updateDoctor = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const { name, specialization, experience, fee, email, phone } = req.body;

    if (!doctorId) {
      return res.status(400).json({
        success: false,
        message: 'Doctor ID required'
      });
    }

    const updates = [];
    const params = [];

    if (name) updates.push('name = ?'), params.push(name);
    if (specialization) updates.push('specialization = ?'), params.push(specialization);
    if (experience) updates.push('experience = ?'), params.push(experience);
    if (fee) updates.push('fee = ?'), params.push(fee);
    if (email) updates.push('email = ?'), params.push(email);
    if (phone) updates.push('phone = ?'), params.push(phone);

    if (updates.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No fields to update'
      });
    }

    params.push(doctorId);
    const query = `UPDATE doctors SET ${updates.join(', ')} WHERE id = ?`;
    await db.execute(query, params);

    const [doctor] = await db.execute(`SELECT * FROM doctors WHERE id = ?`, [doctorId]);

    res.json({
      success: true,
      data: doctor[0]
    });
  } catch (error) {
    console.error('Update doctor error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update doctor',
      error: error.message
    });
  }
};

/**
 * DELETE /api/admin/doctors/:doctorId
 * Delete doctor
 */
exports.deleteDoctor = async (req, res) => {
  try {
    const { doctorId } = req.params;

    if (!doctorId) {
      return res.status(400).json({
        success: false,
        message: 'Doctor ID required'
      });
    }

    await db.execute(`
      DELETE FROM doctors WHERE id = ?
    `, [doctorId]);

    res.json({
      success: true,
      message: 'Doctor deleted successfully'
    });
  } catch (error) {
    console.error('Delete doctor error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete doctor',
      error: error.message
    });
  }
};
