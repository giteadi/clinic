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

module.exports = router;
