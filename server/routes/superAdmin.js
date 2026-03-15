const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/database');
const { body, validationResult } = require('express-validator');

const router = express.Router();

/**
 * POST /api/super-admin/login
 * Super Admin login
 */
router.post('/login', [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required')
], async (req, res) => {
  try {
    console.log('🔐 Super Admin Login Attempt:', { email: req.body.email, timestamp: new Date().toISOString() });
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('❌ Validation Errors:', errors.array());
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { email, password } = req.body;
    console.log('📧 Checking credentials for:', email);

    // Check if super admin (hardcoded for security)
    if (email !== 'superadmin@cliniqpro.com' || password !== 'SuperAdmin@123') {
      console.log('❌ Invalid credentials attempt');
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    console.log('✅ Super Admin authentication successful');

    // Generate JWT token
    const token = jwt.sign(
      { role: 'super_admin', email: 'superadmin@cliniqpro.com' },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '7d' }
    );

    console.log('🎫 JWT Token generated');

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        admin: {
          name: 'Super Admin',
          email: 'superadmin@cliniqpro.com',
          role: 'super_admin'
        },
        token
      }
    });
  } catch (error) {
    console.error('💥 Super admin login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed'
    });
  }
});

/**
 * POST /api/super-admin/clinics
 * Create new clinic
 */
router.post('/clinics', [
  body('name').notEmpty().withMessage('Clinic name is required'),
  body('slug').notEmpty().withMessage('Slug is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').notEmpty().withMessage('Phone is required'),
  body('address').notEmpty().withMessage('Address is required')
], async (req, res) => {
  try {
    console.log('🏥 Creating new clinic...', { body: req.body });
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('❌ Validation Errors:', errors.array());
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { name, slug, email, phone, address, primary_color, secondary_color, logo_url, description } = req.body;
    console.log('📝 Clinic data:', { name, slug, email });

    // Check if slug already exists
    const [existing] = await db.execute('SELECT id FROM clinics WHERE slug = ?', [slug]);
    if (existing.length > 0) {
      console.log('⚠️ Slug already exists:', slug);
      return res.status(400).json({
        success: false,
        message: 'Slug already exists'
      });
    }

    console.log('✅ Slug available, creating clinic...');

    // Create clinic
    const [result] = await db.execute(`
      INSERT INTO clinics (name, slug, email, phone, address, primary_color, secondary_color, logo_url, description)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [name, slug, email, phone, address, primary_color || '#3B82F6', secondary_color || '#60A5FA', logo_url || null, description || null]);

    console.log('✅ Clinic created with ID:', result.insertId);

    // Create clinic admin account
    const adminPassword = 'ClinicAdmin@123';
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    console.log('🔐 Creating clinic admin account...');

    const [adminResult] = await db.execute(`
      INSERT INTO clinic_admins (clinic_id, name, email, password, role, permissions)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [result.insertId, `${name} Admin`, email, hashedPassword, 'admin', JSON.stringify({
      can_manage_doctors: true,
      can_manage_appointments: true,
      can_manage_billing: true,
      can_view_reports: true,
      can_manage_staff: true
    })]);

    console.log('✅ Clinic admin created with ID:', adminResult.insertId);

    res.status(201).json({
      success: true,
      message: 'Clinic created successfully',
      data: {
        clinicId: result.insertId,
        adminId: adminResult.insertId,
        adminEmail: email,
        adminPassword,
        subdomain: `${slug}.localhost:3000`
      }
    });
  } catch (error) {
    console.error('💥 Create clinic error:', error);
    console.error('💥 Error details:', error.message);
    console.error('💥 Stack:', error.stack);
    res.status(500).json({
      success: false,
      message: 'Failed to create clinic',
      error: error.message
    });
  }
});

/**
 * GET /api/super-admin/clinics
 * Get all clinics
 */
router.get('/clinics', async (req, res) => {
  try {
    console.log('🏥 Fetching all clinics...');
    
    const [clinics] = await db.execute(`
      SELECT c.*, 
             COUNT(DISTINCT d.id) as doctors_count,
             COUNT(DISTINCT a.user_id) as patients_count,
             COALESCE(SUM(a.fee), 0) as total_revenue
      FROM clinics c
      LEFT JOIN doctors d ON c.id = d.clinic_id
      LEFT JOIN appointments a ON c.id = a.clinic_id
      GROUP BY c.id
      ORDER BY c.created_at DESC
    `);
    
    console.log(`📋 Found ${clinics.length} clinics`);

    res.json({
      success: true,
      data: clinics.map(clinic => ({
        ...clinic,
        status: 'active', // Default status
        rating: 4.5, // Mock rating
        established: new Date(clinic.created_at).getFullYear().toString()
      }))
    });
  } catch (error) {
    console.error('💥 Get clinics error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch clinics'
    });
  }
});

/**
 * PUT /api/super-admin/clinics/:id
 * Update clinic
 */
router.put('/clinics/:id', [
  body('name').optional().notEmpty().withMessage('Clinic name cannot be empty'),
  body('email').optional().isEmail().withMessage('Valid email is required')
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

    const clinicId = req.params.id;
    const updates = req.body;

    // Build dynamic update query
    const updateFields = [];
    const updateValues = [];

    Object.keys(updates).forEach(key => {
      if (updates[key] !== undefined) {
        updateFields.push(`${key} = ?`);
        updateValues.push(updates[key]);
      }
    });

    if (updateFields.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No valid fields to update'
      });
    }

    updateValues.push(clinicId);

    await db.execute(`
      UPDATE clinics 
      SET ${updateFields.join(', ')}
      WHERE id = ?
    `, updateValues);

    res.json({
      success: true,
      message: 'Clinic updated successfully'
    });
  } catch (error) {
    console.error('Update clinic error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update clinic'
    });
  }
});

/**
 * DELETE /api/super-admin/clinics/:id
 * Delete clinic
 */
router.delete('/clinics/:id', async (req, res) => {
  try {
    const clinicId = req.params.id;

    // Check if clinic exists
    const [clinic] = await db.execute('SELECT name FROM clinics WHERE id = ?', [clinicId]);
    if (clinic.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Clinic not found'
      });
    }

    // Delete clinic (cascade will handle related records)
    await db.execute('DELETE FROM clinics WHERE id = ?', [clinicId]);

    res.json({
      success: true,
      message: 'Clinic deleted successfully'
    });
  } catch (error) {
    console.error('Delete clinic error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete clinic'
    });
  }
});

/**
 * PUT /api/super-admin/clinics/:id/status
 * Toggle clinic status
 */
router.put('/clinics/:id/status', async (req, res) => {
  try {
    const clinicId = req.params.id;
    const { status } = req.body;

    if (!['active', 'inactive', 'maintenance'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
    }

    // Add status column to clinics table if not exists
    await db.execute(`
      ALTER TABLE clinics 
      ADD COLUMN IF NOT EXISTS status ENUM('active', 'inactive', 'maintenance') DEFAULT 'active'
    `);

    await db.execute('UPDATE clinics SET status = ? WHERE id = ?', [status, clinicId]);

    res.json({
      success: true,
      message: 'Clinic status updated successfully'
    });
  } catch (error) {
    console.error('Update clinic status error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update clinic status'
    });
  }
});

/**
 * GET /api/super-admin/stats
 * Get global statistics
 */
router.get('/stats', async (req, res) => {
  try {
    console.log('📊 Fetching Super Admin Stats...');
    
    // Get total clinics
    const [totalClinics] = await db.execute('SELECT COUNT(*) as count FROM clinics');
    console.log('🏥 Total Clinics:', totalClinics[0].count);

    // Get total patients
    const [totalPatients] = await db.execute('SELECT COUNT(DISTINCT user_id) as count FROM appointments');
    console.log('👥 Total Patients:', totalPatients[0].count);

    // Get total doctors
    const [totalDoctors] = await db.execute('SELECT COUNT(*) as count FROM doctors');
    console.log('👨‍⚕️ Total Doctors:', totalDoctors[0].count);

    // Get total revenue
    const [totalRevenue] = await db.execute('SELECT COALESCE(SUM(fee), 0) as total FROM appointments');
    console.log('💰 Total Revenue:', totalRevenue[0].total);

    // Get monthly growth (mock for now)
    const monthlyGrowth = {
      clinics: 8,
      patients: 12,
      revenue: 18,
      doctors: 15
    };

    console.log('✅ Stats fetched successfully');

    res.json({
      success: true,
      data: {
        totalClinics: totalClinics[0].count,
        totalPatients: totalPatients[0].count,
        totalDoctors: totalDoctors[0].count,
        totalRevenue: totalRevenue[0].total,
        monthlyGrowth
      }
    });
  } catch (error) {
    console.error('💥 Get stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch statistics'
    });
  }
});

/**
 * POST /api/super-admin/doctors
 * Add doctor to any clinic
 */
router.post('/doctors', [
  body('clinic_id').notEmpty().withMessage('Clinic ID is required'),
  body('name').notEmpty().withMessage('Doctor name is required'),
  body('specialization').notEmpty().withMessage('Specialization is required'),
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

    const { clinic_id, name, email, phone, specialization, experience, fee, bio } = req.body;

    // Check if clinic exists
    const [clinic] = await db.execute('SELECT name FROM clinics WHERE id = ?', [clinic_id]);
    if (clinic.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Clinic not found'
      });
    }

    // Create doctor
    const [result] = await db.execute(`
      INSERT INTO doctors (clinic_id, name, email, phone, specialization, experience, fee, bio)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [clinic_id, name, email, phone, specialization, experience, fee, bio]);

    res.status(201).json({
      success: true,
      message: 'Doctor added successfully',
      data: { id: result.insertId, clinic_id, name, email }
    });
  } catch (error) {
    console.error('Add doctor error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add doctor'
    });
  }
});

/**
 * GET /api/super-admin/users
 * Get all users across all clinics
 */
router.get('/users', async (req, res) => {
  try {
    const [users] = await db.execute(`
      SELECT u.*, 
             COUNT(DISTINCT a.clinic_id) as clinics_visited,
             MAX(a.created_at) as last_appointment
      FROM users u
      LEFT JOIN appointments a ON u.id = a.user_id
      GROUP BY u.id
      ORDER BY u.created_at DESC
      LIMIT 100
    `);

    res.json({
      success: true,
      data: users
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users'
    });
  }
});

module.exports = router;
