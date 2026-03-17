const express = require('express');
const db = require('../config/database');
const { body, validationResult } = require('express-validator');
const crypto = require('crypto');
const Razorpay = require('razorpay');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_1DP5mmOlF5G5ag',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'test_secret_key'
});

/**
 * POST /api/appointments
 * Book new appointment (THE CORE FUNCTIONALITY)
 */
router.post('/', [
  body('doctor_id').notEmpty().withMessage('Doctor ID is required'),
  body('appointment_date').isDate().withMessage('Valid date is required'),
  body('appointment_time').notEmpty().withMessage('Time is required')
], authMiddleware, async (req, res) => {
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

    const { doctor_id, appointment_date, appointment_time, notes } = req.body;

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
    `, [req.user.id, req.clinicId, doctor_id, appointment_date, appointment_time, notes || '']);

    res.status(201).json({
      success: true,
      message: 'Appointment booked successfully',
      data: { 
        id: result.insertId, 
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

/**
 * GET /api/appointments/user
 * Get current user's appointments
 */
router.get('/user', authMiddleware, async (req, res) => {
  try {
    const [appointments] = await db.execute(`
      SELECT a.*, d.name as doctor_name, d.specialization, c.name as clinic_name
      FROM appointments a
      JOIN doctors d ON a.doctor_id = d.id
      JOIN clinics c ON a.clinic_id = c.id
      WHERE a.user_id = ?
      ORDER BY a.appointment_date DESC, a.appointment_time DESC
    `, [req.user.id]);
    
    res.json({
      success: true,
      data: appointments
    });
  } catch (error) {
    console.error('Get user appointments error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch appointments'
    });
  }
});

/**
 * GET /api/appointments/clinic
 * Get clinic's appointments (for clinic admin)
 */
router.get('/clinic', async (req, res) => {
  try {
    if (!req.clinicId) {
      return res.status(400).json({
        success: false,
        message: 'Clinic not detected'
      });
    }

    const { date } = req.query;
    let query = `
      SELECT a.*, u.name as patient_name, u.phone as patient_phone, d.name as doctor_name
      FROM appointments a
      JOIN users u ON a.user_id = u.id
      JOIN doctors d ON a.doctor_id = d.id
      WHERE a.clinic_id = ?
    `;
    const params = [req.clinicId];

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
      message: 'Failed to fetch appointments'
    });
  }
});

/**
 * PUT /api/appointments/:id/status
 * Update appointment status
 */
router.put('/:id/status', [
  body('status').isIn(['pending', 'confirmed', 'completed', 'cancelled']).withMessage('Invalid status')
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

    const appointmentId = req.params.id;
    const { status } = req.body;

    // Verify appointment belongs to current clinic
    const [appointments] = await db.execute(`
      SELECT id FROM appointments 
      WHERE id = ? AND clinic_id = ?
    `, [appointmentId, req.clinicId]);

    if (appointments.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    await db.execute(`
      UPDATE appointments 
      SET status = ? 
      WHERE id = ?
    `, [status, appointmentId]);

    res.json({
      success: true,
      message: 'Appointment status updated successfully'
    });
  } catch (error) {
    console.error('Update appointment status error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update appointment'
    });
  }
});

/**
 * POST /api/appointments/create-order
 * Create Razorpay order for appointment booking
 */
router.post('/create-order', authMiddleware, [
  body('amount').isFloat({ min: 0.01 }).withMessage('Valid amount is required'),
  body('appointmentData').notEmpty().withMessage('Appointment data is required')
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

    const { amount, appointmentData } = req.body;

    // Create Razorpay order
    const order = await razorpay.orders.create({
      amount: Math.round(amount), // Amount in paise
      currency: 'INR',
      receipt: `APT_${Date.now()}`,
      notes: {
        appointmentData: JSON.stringify(appointmentData)
      }
    });

    res.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.RAZORPAY_KEY_ID || 'rzp_test_1DP5mmOlF5G5ag'
    });
  } catch (error) {
    console.error('Create Razorpay order error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create payment order'
    });
  }
});

/**
 * POST /api/appointments/verify-payment
 * Verify Razorpay payment and create appointment
 */
router.post('/verify-payment', authMiddleware, [
  body('orderId').notEmpty().withMessage('Order ID is required'),
  body('paymentId').notEmpty().withMessage('Payment ID is required'),
  body('signature').notEmpty().withMessage('Signature is required'),
  body('appointmentData').notEmpty().withMessage('Appointment data is required')
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

    const { orderId, paymentId, signature, appointmentData } = req.body;

    // Verify signature
    const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || 'test_secret_key');
    hmac.update(orderId + '|' + paymentId);
    const generatedSignature = hmac.digest('hex');

    if (generatedSignature !== signature) {
      return res.status(400).json({
        success: false,
        message: 'Payment verification failed: Invalid signature'
      });
    }

    // Extract appointment data
    const { doctorId, clinicId, date, time, patientDetails } = appointmentData;

    // Create appointment record
    const [result] = await db.execute(`
      INSERT INTO appointments (
        user_id, clinic_id, doctor_id, appointment_date, appointment_time, 
        patient_name, patient_phone, patient_email, patient_age, patient_gender, 
        reason, status, payment_id, order_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      req.user.id, 
      clinicId, 
      doctorId, 
      date, 
      time,
      patientDetails.name,
      patientDetails.phone,
      patientDetails.email,
      patientDetails.age,
      patientDetails.gender,
      patientDetails.reason,
      'confirmed',
      paymentId,
      orderId
    ]);

    res.json({
      success: true,
      message: 'Payment verified and appointment created successfully',
      appointmentId: result.insertId,
      paymentId,
      orderId
    });
  } catch (error) {
    console.error('Verify payment error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to verify payment'
    });
  }
});

module.exports = router;
