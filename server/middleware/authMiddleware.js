const jwt = require('jsonwebtoken');
const db = require('../config/database');

/**
 * Authentication middleware for protecting routes
 */
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
    
    // Get user from database
    const [users] = await db.execute(
      'SELECT id, name, phone, email FROM users WHERE id = ?',
      [decoded.userId]
    );
    
    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token. User not found.'
      });
    }

    req.user = users[0];
    next();
  } catch (error) {
    console.error('Auth error:', error);
    res.status(401).json({
      success: false,
      message: 'Invalid token.'
    });
  }
};

/**
 * Clinic admin authentication middleware
 */
const clinicAuthMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
    
    // Get clinic admin from database
    const [admins] = await db.execute(`
      SELECT ca.*, c.name as clinic_name, c.slug as clinic_slug 
      FROM clinic_admins ca 
      JOIN clinics c ON ca.clinic_id = c.id 
      WHERE ca.id = ?
    `, [decoded.adminId]);
    
    if (admins.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token. Admin not found.'
      });
    }

    req.admin = admins[0];
    next();
  } catch (error) {
    console.error('Clinic auth error:', error);
    res.status(401).json({
      success: false,
      message: 'Invalid token.'
    });
  }
};

module.exports = { authMiddleware, clinicAuthMiddleware };
