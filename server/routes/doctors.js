const express = require('express');
const db = require('../config/database');
const { body, validationResult } = require('express-validator');

const router = express.Router();

/**
 * GET /api/doctors
 * Get doctors for current clinic (from subdomain)
 */
router.get('/', async (req, res) => {
  try {
    if (!req.clinicId) {
      return res.status(400).json({
        success: false,
        message: 'Clinic not detected'
      });
    }

    const [doctors] = await db.execute(`
      SELECT id, name, specialization, experience, fee, image 
      FROM doctors 
      WHERE clinic_id = ?
      ORDER BY created_at DESC
    `, [req.clinicId]);
    
    res.json({
      success: true,
      data: doctors
    });
  } catch (error) {
    console.error('Get doctors error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch doctors'
    });
  }
});

/**
 * GET /api/doctors/:id/schedule
 * Get doctor's available schedule
 */
router.get('/:id/schedule', async (req, res) => {
  try {
    const doctorId = req.params.id;

    // Verify doctor belongs to current clinic
    const [doctors] = await db.execute(
      'SELECT id FROM doctors WHERE id = ? AND clinic_id = ?',
      [doctorId, req.clinicId]
    );

    if (doctors.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found'
      });
    }

    const [schedule] = await db.execute(`
      SELECT day, start_time, end_time, slot_duration 
      FROM doctor_schedule 
      WHERE doctor_id = ?
      ORDER BY FIELD(day, 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')
    `, [doctorId]);
    
    res.json({
      success: true,
      data: schedule
    });
  } catch (error) {
    console.error('Get schedule error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch schedule'
    });
  }
});

/**
 * GET /api/doctors/:id/available-slots
 * Get available time slots for a doctor on a specific date
 */
router.get('/:id/available-slots', async (req, res) => {
  try {
    const doctorId = req.params.id;
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({
        success: false,
        message: 'Date is required'
      });
    }

    // Get doctor's schedule for the day
    const dayName = new Date(date).toLocaleDateString('en-US', { weekday: 'long' });
    
    const [schedule] = await db.execute(`
      SELECT start_time, end_time, slot_duration 
      FROM doctor_schedule 
      WHERE doctor_id = ? AND day = ?
    `, [doctorId, dayName]);

    if (schedule.length === 0) {
      return res.json({
        success: true,
        data: []
      });
    }

    // Get booked appointments for that date
    const [booked] = await db.execute(`
      SELECT appointment_time 
      FROM appointments 
      WHERE doctor_id = ? AND appointment_date = ? AND status IN ('pending', 'confirmed')
    `, [doctorId, date]);

    const bookedTimes = booked.map(b => b.appointment_time);
    const { start_time, end_time, slot_duration } = schedule[0];
    
    // Generate available slots
    const availableSlots = [];
    const [startHour, startMin] = start_time.split(':').map(Number);
    const [endHour, endMin] = end_time.split(':').map(Number);
    
    let currentTime = startHour * 60 + startMin;
    const endTime = endHour * 60 + endMin;
    
    while (currentTime + slot_duration <= endTime) {
      const timeString = `${Math.floor(currentTime / 60).toString().padStart(2, '0')}:${(currentTime % 60).toString().padStart(2, '0')}`;
      
      if (!bookedTimes.includes(timeString)) {
        availableSlots.push(timeString);
      }
      
      currentTime += slot_duration;
    }
    
    res.json({
      success: true,
      data: availableSlots
    });
  } catch (error) {
    console.error('Get available slots error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch available slots'
    });
  }
});

/**
 * POST /api/doctors
 * Add new doctor (clinic admin only)
 */
router.post('/', [
  body('name').notEmpty().withMessage('Doctor name is required'),
  body('specialization').notEmpty().withMessage('Specialization is required'),
  body('fee').isNumeric().withMessage('Fee must be a number')
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

    const { name, specialization, experience, fee, image } = req.body;

    const [result] = await db.execute(`
      INSERT INTO doctors (clinic_id, name, specialization, experience, fee, image) 
      VALUES (?, ?, ?, ?, ?)
    `, [req.clinicId, name, specialization, experience || '', fee, image || '']);

    res.status(201).json({
      success: true,
      message: 'Doctor added successfully',
      data: { id: result.insertId, name, specialization, fee }
    });
  } catch (error) {
    console.error('Add doctor error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add doctor'
    });
  }
});

module.exports = router;
