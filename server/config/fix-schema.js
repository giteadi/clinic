const db = require('../config/database');

/**
 * Fix database schema issues for super admin functionality
 */
async function fixDatabaseSchema() {
  try {
    console.log('🔧 Fixing database schema issues...');

    // 1. Check if logo_url column exists, if not add it or rename logo to logo_url
    console.log('📝 Updating clinics table...');
    
    // Check current columns
    const [columns] = await db.execute('SHOW COLUMNS FROM clinics');
    const hasLogoUrl = columns.some(col => col.Field === 'logo_url');
    const hasLogo = columns.some(col => col.Field === 'logo');
    
    if (!hasLogoUrl && hasLogo) {
      // Rename logo to logo_url
      await db.execute('ALTER TABLE clinics CHANGE COLUMN logo logo_url VARCHAR(500)');
    } else if (!hasLogoUrl) {
      // Add logo_url column
      await db.execute('ALTER TABLE clinics ADD COLUMN logo_url VARCHAR(500)');
    }

    // 2. Fix clinic_admins table - add permissions column and fix role column
    console.log('📝 Updating clinic_admins table...');
    
    // Check clinic_admins columns
    const [adminColumns] = await db.execute('SHOW COLUMNS FROM clinic_admins');
    const hasPermissions = adminColumns.some(col => col.Field === 'permissions');
    
    if (!hasPermissions) {
      await db.execute('ALTER TABLE clinic_admins ADD COLUMN permissions TEXT');
    }
    
    // Modify role column to support more values
    await db.execute(`
      ALTER TABLE clinic_admins 
      MODIFY COLUMN role ENUM('admin', 'receptionist', 'doctor', 'manager') DEFAULT 'receptionist'
    `);

    // 3. Fix doctors table - add missing columns
    console.log('📝 Updating doctors table...');
    
    // Check doctors columns
    const [doctorColumns] = await db.execute('SHOW COLUMNS FROM doctors');
    const hasDoctorEmail = doctorColumns.some(col => col.Field === 'email');
    const hasDoctorPhone = doctorColumns.some(col => col.Field === 'phone');
    const hasDoctorBio = doctorColumns.some(col => col.Field === 'bio');
    
    if (!hasDoctorEmail) {
      await db.execute('ALTER TABLE doctors ADD COLUMN email VARCHAR(255)');
    }
    if (!hasDoctorPhone) {
      await db.execute('ALTER TABLE doctors ADD COLUMN phone VARCHAR(20)');
    }
    if (!hasDoctorBio) {
      await db.execute('ALTER TABLE doctors ADD COLUMN bio TEXT');
    }

    // 4. Add status column to clinics if not exists
    const [clinicColumns] = await db.execute('SHOW COLUMNS FROM clinics');
    const hasStatus = clinicColumns.some(col => col.Field === 'status');
    
    if (!hasStatus) {
      await db.execute(`
        ALTER TABLE clinics 
        ADD COLUMN status ENUM('active', 'inactive', 'maintenance') DEFAULT 'active'
      `);
    }

    console.log('✅ Database schema fixed successfully!');
  } catch (error) {
    console.error('❌ Error fixing database schema:', error);
    throw error;
  }
}

// Run if called directly
if (require.main === module) {
  fixDatabaseSchema()
    .then(() => {
      console.log('🎉 Database schema update completed!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Schema update failed:', error);
      process.exit(1);
    });
}

module.exports = { fixDatabaseSchema };
