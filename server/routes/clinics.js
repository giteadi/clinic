const express = require('express');
const db = require('../config/database');
const { body, validationResult } = require('express-validator');

const router = express.Router();

/**
 * GET /api/clinics
 * Get all clinics (for super admin)
 */
router.get('/', async (req, res) => {
  try {
    const [clinics] = await db.execute(`
      SELECT id, name, slug, phone, email, address, logo, created_at 
      FROM clinics 
      ORDER BY created_at DESC
    `);
    
    res.json({
      success: true,
      data: clinics
    });
  } catch (error) {
    console.error('Get clinics error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch clinics'
    });
  }
});

/**
 * GET /api/clinics/current
 * Get current clinic from subdomain
 */
router.get('/current', async (req, res) => {
  try {
    if (!req.clinic) {
      return res.status(404).json({
        success: false,
        message: 'No clinic detected'
      });
    }
    
    res.json({
      success: true,
      data: req.clinic
    });
  } catch (error) {
    console.error('Get current clinic error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch clinic'
    });
  }
});

/**
 * POST /api/clinics
 * Create new clinic (for super admin)
 */
router.post('/', [
  body('name').notEmpty().withMessage('Clinic name is required'),
  body('slug').notEmpty().withMessage('Clinic slug is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').notEmpty().withMessage('Phone number is required')
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

    const { name, slug, email, phone, address } = req.body;

    // Check if slug already exists
    const [existing] = await db.execute(
      'SELECT id FROM clinics WHERE slug = ?',
      [slug]
    );

    if (existing.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Clinic slug already exists'
      });
    }

    const [result] = await db.execute(`
      INSERT INTO clinics (name, slug, email, phone, address) 
      VALUES (?, ?, ?, ?, ?)
    `, [name, slug, email, phone, address]);

    res.status(201).json({
      success: true,
      message: 'Clinic created successfully',
      data: { id: result.insertId, name, slug, email, phone, address }
    });
  } catch (error) {
    console.error('Create clinic error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create clinic'
    });
  }
});

module.exports = router;
