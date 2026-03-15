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

    const admin = admins[0];
    
    // Get current subdomain from request
    const hostname = req.hostname;
    const subdomain = hostname.split('.')[0];
    
    console.log(`🔐 Admin Clinic Validation: ${admin.name} (${admin.clinic_slug}) trying to access ${subdomain} subdomain`);
    
    // Skip subdomain validation for localhost and main domain
    if (hostname !== 'localhost' && hostname !== '127.0.0.1' && subdomain !== 'www' && subdomain !== 'yourapp.com') {
      // Validate that admin belongs to the current clinic subdomain
      if (admin.clinic_slug !== subdomain) {
        console.log(`❌ Access denied: Admin ${admin.name} from ${admin.clinic_slug} trying to access ${subdomain}`);
        return res.status(403).json({
          success: false,
          message: 'Access denied. You can only access your own clinic data.',
          error: 'CLINIC_MISMATCH'
        });
      }
    }

    req.admin = admin;
    req.clinicId = admin.clinic_id;
    req.clinicSlug = admin.clinic_slug;
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
