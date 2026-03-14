const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/database');
const { body, validationResult } = require('express-validator');

const router = express.Router();

/**
 * POST /api/users/register
 * Register new patient (global - can book at any clinic)
 */
router.post('/register', [
  body('name').notEmpty().withMessage('Name is required'),
  body('phone').notEmpty().withMessage('Phone is required'),
  body('email').isEmail().withMessage('Valid email is required')
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

    const { name, phone, email, password } = req.body;

    // Check if user already exists
    const [existing] = await db.execute(
      'SELECT id FROM users WHERE phone = ? OR email = ?',
      [phone, email]
    );

    if (existing.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this phone or email'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password || 'default123', 10);

    // Create user
    const [result] = await db.execute(`
      INSERT INTO users (name, phone, email, password) 
      VALUES (?, ?, ?, ?)
    `, [name, phone, email, hashedPassword]);

    // Generate JWT token
    const token = jwt.sign(
      { userId: result.insertId },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '7d' }
    );

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      data: {
        user: { id: result.insertId, name, phone, email },
        token
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Registration failed'
    });
  }
});

/**
 * POST /api/users/login
 * Login patient
 */
router.post('/login', [
  body('phone').notEmpty().withMessage('Phone is required'),
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

    const { phone, password } = req.body;

    // Find user
    const [users] = await db.execute(
      'SELECT * FROM users WHERE phone = ?',
      [phone]
    );

    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const user = users[0];

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: { 
          id: user.id, 
          name: user.name, 
          phone: user.phone, 
          email: user.email 
        },
        token
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed'
    });
  }
});

/**
 * GET /api/users/profile
 * Get user profile
 */
router.get('/profile', async (req, res) => {
  try {
    // This would normally use authMiddleware, but for simplicity we'll get from query
    const { userId } = req.query;
    
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required'
      });
    }

    const [users] = await db.execute(
      'SELECT id, name, phone, email FROM users WHERE id = ?',
      [userId]
    );

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: users[0]
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch profile'
    });
  }
});

module.exports = router;
