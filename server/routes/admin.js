const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/database');
const { body, validationResult } = require('express-validator');

const router = express.Router();

/**
 * POST /api/admin/login
 * Login for clinic staff (admin, receptionist, doctor)
 */
router.post('/login', [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { email, password } = req.body;

    // Find clinic admin
    const [admins] = await db.execute(`
      SELECT ca.*, c.name as clinic_name, c.slug as clinic_slug 
      FROM clinic_admins ca 
      JOIN clinics c ON ca.clinic_id = c.id 
      WHERE ca.email = ?
    `, [email]);

    if (admins.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const admin = admins[0];

    // Check password
    const isValidPassword = await bcrypt.compare(password, admin.password);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { adminId: admin.id, clinicId: admin.clinic_id, role: admin.role },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        admin: {
          id: admin.id,
          name: admin.name,
          email: admin.email,
          role: admin.role,
          clinic: {
            id: admin.clinic_id,
            name: admin.clinic_name,
            slug: admin.clinic_slug
          }
        },
        token
      }
    });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed'
    });
  }
});

/**
 * GET /api/admin/dashboard
 * Get dashboard stats for current clinic
 */
router.get('/dashboard', async (req, res) => {
  try {
    if (!req.clinicId) {
      return res.status(400).json({
        success: false,
        message: 'Clinic not detected'
      });
    }

    // Get today's appointments
    const [todayAppointments] = await db.execute(`
      SELECT COUNT(*) as count 
      FROM appointments 
      WHERE clinic_id = ? AND appointment_date = CURDATE()
    `, [req.clinicId]);

    // Get total patients
    const [totalPatients] = await db.execute(`
      SELECT COUNT(DISTINCT user_id) as count 
      FROM appointments 
      WHERE clinic_id = ?
    `, [req.clinicId]);

    // Get total doctors
    const [totalDoctors] = await db.execute(`
      SELECT COUNT(*) as count 
      FROM doctors 
      WHERE clinic_id = ?
    `, [req.clinicId]);

    // Get upcoming appointments
    const [upcomingAppointments] = await db.execute(`
      SELECT a.*, u.name as patient_name, d.name as doctor_name
      FROM appointments a
      JOIN users u ON a.user_id = u.id
      JOIN doctors d ON a.doctor_id = d.id
      WHERE a.clinic_id = ? AND a.appointment_date >= CURDATE()
      ORDER BY a.appointment_date ASC, a.appointment_time ASC
      LIMIT 5
    `, [req.clinicId]);

    res.json({
      success: true,
      data: {
        stats: {
          todayAppointments: todayAppointments[0].count,
          totalPatients: totalPatients[0].count,
          totalDoctors: totalDoctors[0].count
        },
        upcomingAppointments
      }
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard data'
    });
  }
});

/**
 * POST /api/admin/staff
 * Add new staff member (clinic admin only)
 */
router.post('/staff', [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('role').isIn(['admin', 'receptionist', 'doctor']).withMessage('Invalid role'),
  body('password').notEmpty().withMessage('Password is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    if (!req.clinicId) {
      return res.status(400).json({
        success: false,
        message: 'Clinic not detected'
      });
    }

    const { name, email, role, password } = req.body;

    // Check if email already exists for this clinic
    const [existing] = await db.execute(
      'SELECT id FROM clinic_admins WHERE email = ? AND clinic_id = ?',
      [email, req.clinicId]
    );

    if (existing.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Staff member already exists'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create staff member
    const [result] = await db.execute(`
      INSERT INTO clinic_admins (clinic_id, name, email, password, role) 
      VALUES (?, ?, ?, ?, ?)
    `, [req.clinicId, name, email, hashedPassword, role]);

    res.status(201).json({
      success: true,
      message: 'Staff member added successfully',
      data: { id: result.insertId, name, email, role }
    });
  } catch (error) {
    console.error('Add staff error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add staff member'
    });
  }
});

/**
 * GET /api/admin/appointments
 * Get all appointments for this clinic
 */
router.get('/appointments', async (req, res) => {
  try {
    if (!req.clinicId) {
      return res.status(400).json({
        success: false,
        message: 'Clinic not detected'
      });
    }

    const [appointments] = await db.execute(`
      SELECT a.*, u.name as patient_name, u.email as patient_email, u.phone as patient_phone,
             d.name as doctor_name, d.specialization
      FROM appointments a
      JOIN users u ON a.user_id = u.id
      JOIN doctors d ON a.doctor_id = d.id
      WHERE a.clinic_id = ?
      ORDER BY a.appointment_date DESC, a.appointment_time DESC
    `, [req.clinicId]);

    res.json({
      success: true,
      data: appointments
    });
  } catch (error) {
    console.error('Get appointments error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch appointments'
    });
  }
});

/**
 * PUT /api/admin/appointments/:id/status
 * Update appointment status (confirm, cancel, complete)
 */
router.put('/appointments/:id/status', [
  body('status').isIn(['pending', 'confirmed', 'cancelled', 'completed']).withMessage('Invalid status')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    if (!req.clinicId) {
      return res.status(400).json({
        success: false,
        message: 'Clinic not detected'
      });
    }

    const { status } = req.body;
    const appointmentId = req.params.id;

    // Check if appointment belongs to this clinic
    const [appointments] = await db.execute(
      'SELECT id FROM appointments WHERE id = ? AND clinic_id = ?',
      [appointmentId, req.clinicId]
    );

    if (appointments.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found or access denied'
      });
    }

    // Update appointment status
    await db.execute(
      'UPDATE appointments SET status = ?, updated_at = NOW() WHERE id = ?',
      [status, appointmentId]
    );

    res.json({
      success: true,
      message: 'Appointment status updated successfully'
    });
  } catch (error) {
    console.error('Update appointment status error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update appointment status'
    });
  }
});

/**
 * POST /api/admin/appointments
 * Book appointment on behalf of patient
 */
router.post('/appointments', [
  body('patient_email').isEmail().withMessage('Valid patient email is required'),
  body('doctor_id').notEmpty().withMessage('Doctor ID is required'),
  body('appointment_date').isDate().withMessage('Valid date is required'),
  body('appointment_time').notEmpty().withMessage('Time is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    if (!req.clinicId) {
      return res.status(400).json({
        success: false,
        message: 'Clinic not detected'
      });
    }

    const { patient_email, doctor_id, appointment_date, appointment_time, notes } = req.body;

    // Find patient
    const [patients] = await db.execute(
      'SELECT id FROM users WHERE email = ?',
      [patient_email]
    );

    if (patients.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Patient not found'
      });
    }

    const patient_id = patients[0].id;

    // Check if slot is available
    const [existing] = await db.execute(`
      SELECT id FROM appointments 
      WHERE doctor_id = ? AND appointment_date = ? AND appointment_time = ? 
      AND status IN ('pending', 'confirmed') AND clinic_id = ?
    `, [doctor_id, appointment_date, appointment_time, req.clinicId]);

    if (existing.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Time slot already booked'
      });
    }

    // Create appointment
    const [result] = await db.execute(`
      INSERT INTO appointments (user_id, doctor_id, clinic_id, appointment_date, appointment_time, notes, status)
      VALUES (?, ?, ?, ?, ?, ?, 'confirmed')
    `, [patient_id, doctor_id, req.clinicId, appointment_date, appointment_time, notes]);

    res.status(201).json({
      success: true,
      message: 'Appointment booked successfully',
      data: { id: result.insertId }
    });
  } catch (error) {
    console.error('Book appointment error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to book appointment'
    });
  }
});

module.exports = router;
