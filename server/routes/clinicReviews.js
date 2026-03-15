const express = require('express');
const db = require('../config/database');

const router = express.Router();

/**
 * GET /api/clinics/:clinicId/reviews
 * Get reviews for a specific clinic
 */
router.get('/:clinicId/reviews', async (req, res) => {
  try {
    const clinicId = req.params.clinicId;
    
    // For now, return mock data. In production, this would come from a reviews table
    const mockReviews = {
      'dental': [
        {
          id: 1,
          patientName: 'Rahul Sharma',
          rating: 5,
          comment: 'Excellent dental care! The staff is very professional and caring.',
          date: '2024-01-15',
          clinicId: 'dental'
        },
        {
          id: 2,
          patientName: 'Priya Patel',
          rating: 4,
          comment: 'Great experience with Dr. Mehta. Very thorough examination.',
          date: '2024-01-10',
          clinicId: 'dental'
        },
        {
          id: 3,
          patientName: 'Amit Kumar',
          rating: 5,
          comment: 'Best dental clinic in the city! Clean and modern facilities.',
          date: '2024-01-05',
          clinicId: 'dental'
        }
      ],
      'medical': [
        {
          id: 4,
          patientName: 'Sneha Gupta',
          rating: 5,
          comment: 'Dr. Reddy is an excellent physician. Takes time to listen to patients.',
          date: '2024-01-12',
          clinicId: 'medical'
        }
      ],
      'ortho': [
        {
          id: 5,
          patientName: 'Vikram Singh',
          rating: 4,
          comment: 'Amazing orthopedic care! Recovered quickly from my knee surgery.',
          date: '2024-01-08',
          clinicId: 'ortho'
        }
      ]
    };

    const reviews = mockReviews[clinicId] || [];
    
    res.json({
      success: true,
      data: reviews
    });
  } catch (error) {
    console.error('Get reviews error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch reviews'
    });
  }
});

/**
 * GET /api/clinics/:clinicId/doctors
 * Get doctors for a specific clinic (alternative endpoint)
 */
router.get('/:clinicId/doctors', async (req, res) => {
  try {
    const clinicId = req.params.clinicId;
    
    // For now, return the same doctors as the main doctors endpoint
    // In production, this would filter by clinic_id
    const [doctors] = await db.execute(`
      SELECT id, name, specialization, experience, fee, image 
      FROM doctors 
      ORDER BY created_at DESC
    `);
    
    res.json({
      success: true,
      data: doctors
    });
  } catch (error) {
    console.error('Get clinic doctors error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch clinic doctors'
    });
  }
});

/**
 * GET /api/clinics/:clinicId/appointments
 * Get appointments for a specific clinic
 */
router.get('/:clinicId/appointments', async (req, res) => {
  try {
    const clinicId = req.params.clinicId;
    const { date } = req.query;
    
    let query = `
      SELECT a.*, u.name as patient_name, u.phone as patient_phone, d.name as doctor_name
      FROM appointments a
      JOIN users u ON a.user_id = u.id
      JOIN doctors d ON a.doctor_id = d.id
      WHERE a.clinic_id = ?
    `;
    const params = [1]; // Default clinic ID for now
    
    if (date) {
      query += ' AND a.appointment_date = ?';
      params.push(date);
    }

    query += ' ORDER BY a.appointment_date DESC, a.appointment_time DESC';

    const [appointments] = await db.execute(query, params);
    
    res.json({
      success: true,
      data: appointments
    });
  } catch (error) {
    console.error('Get clinic appointments error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch clinic appointments'
    });
  }
});

/**
 * POST /api/clinics/:clinicId/appointments
 * Book appointment at specific clinic
 */
router.post('/:clinicId/appointments', async (req, res) => {
  try {
    const clinicId = req.params.clinicId;
    const { user_id, doctor_id, appointment_date, appointment_time, notes } = req.body;

    // Check if slot is available
    const [existing] = await db.execute(`
      SELECT id FROM appointments 
      WHERE doctor_id = ? AND appointment_date = ? AND appointment_time = ? 
      AND status IN ('pending', 'confirmed')
    `, [doctor_id, appointment_date, appointment_time]);

    if (existing.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Time slot already booked'
      });
    }

    // Create appointment
    const [result] = await db.execute(`
      INSERT INTO appointments (user_id, clinic_id, doctor_id, appointment_date, appointment_time, notes) 
      VALUES (?, ?, ?, ?, ?, ?)
    `, [user_id, 1, doctor_id, appointment_date, appointment_time, notes || '']);

    res.status(201).json({
      success: true,
      message: 'Appointment booked successfully',
      data: { 
        id: result.insertId, 
        user_id, 
        clinic_id: 1, 
        doctor_id, 
        appointment_date, 
        appointment_time,
        status: 'pending'
      }
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
