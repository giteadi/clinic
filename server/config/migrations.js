const db = require('../config/database');

/**
 * Create all tables for the multi-clinic SaaS system
 * Run this once to set up the database
 */
async function createTables() {
  try {
    console.log('🔨 Creating database tables...');

    // Clinics table - Each clinic is a tenant
    await db.execute(`
      CREATE TABLE IF NOT EXISTS clinics (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(100) NOT NULL UNIQUE,
        phone VARCHAR(20),
        email VARCHAR(255),
        address TEXT,
        logo VARCHAR(500),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX (slug)
      )
    `);

    // Users table - Global patients (can book at any clinic)
    await db.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NOT NULL UNIQUE,
        email VARCHAR(255) UNIQUE,
        password VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX (phone)
      )
    `);

    // Doctors table - Linked to specific clinics
    await db.execute(`
      CREATE TABLE IF NOT EXISTS doctors (
        id INT AUTO_INCREMENT PRIMARY KEY,
        clinic_id INT NOT NULL,
        name VARCHAR(255) NOT NULL,
        specialization VARCHAR(100),
        experience VARCHAR(100),
        fee DECIMAL(10,2),
        image VARCHAR(500),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (clinic_id) REFERENCES clinics(id) ON DELETE CASCADE,
        INDEX (clinic_id)
      )
    `);

    // Doctor Schedule - When doctors are available
    await db.execute(`
      CREATE TABLE IF NOT EXISTS doctor_schedule (
        id INT AUTO_INCREMENT PRIMARY KEY,
        doctor_id INT NOT NULL,
        day ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday') NOT NULL,
        start_time TIME NOT NULL,
        end_time TIME NOT NULL,
        slot_duration INT DEFAULT 15,
        FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE CASCADE,
        INDEX (doctor_id)
      )
    `);

    // Appointments table - THE MOST IMPORTANT TABLE
    await db.execute(`
      CREATE TABLE IF NOT EXISTS appointments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        clinic_id INT NOT NULL,
        doctor_id INT NOT NULL,
        appointment_date DATE NOT NULL,
        appointment_time TIME NOT NULL,
        status ENUM('pending', 'confirmed', 'completed', 'cancelled') DEFAULT 'pending',
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (clinic_id) REFERENCES clinics(id) ON DELETE CASCADE,
        FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE CASCADE,
        INDEX (clinic_id),
        INDEX (doctor_id),
        INDEX (appointment_date),
        INDEX (user_id)
      )
    `);

    // Clinic Admins - Staff login for each clinic
    await db.execute(`
      CREATE TABLE IF NOT EXISTS clinic_admins (
        id INT AUTO_INCREMENT PRIMARY KEY,
        clinic_id INT NOT NULL,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        role ENUM('admin', 'receptionist', 'doctor') DEFAULT 'receptionist',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (clinic_id) REFERENCES clinics(id) ON DELETE CASCADE,
        UNIQUE KEY (clinic_id, email),
        INDEX (clinic_id)
      )
    `);

    // Insert sample data for testing
    await insertSampleData();

    console.log('✅ All tables created successfully!');
  } catch (error) {
    console.error('❌ Error creating tables:', error);
  }
}

/**
 * Insert sample clinics for testing
 */
async function insertSampleData() {
  try {
    console.log('📝 Inserting sample data...');

    // Check if data already exists
    const [existingClinics] = await db.execute('SELECT COUNT(*) as count FROM clinics');
    if (existingClinics[0].count > 0) {
      console.log('📊 Sample data already exists');
      return;
    }

    // Insert sample clinics
    await db.execute(`
      INSERT INTO clinics (name, slug, phone, email, address) VALUES
      ('City Dental Clinic', 'citydental', '+91 98765 43210', 'citydental@email.com', '123 MG Road, Mumbai'),
      ('Smile Care Dental', 'smilecare', '+91 98765 43211', 'smilecare@email.com', '456 Brigade Road, Bangalore'),
      ('Metro Medical Center', 'metro', '+91 98765 43212', 'metro@email.com', '789 Nehru Place, Delhi')
    `);

    // Get clinic IDs
    const [clinics] = await db.execute('SELECT id, slug FROM clinics');
    
    // Insert sample doctors for each clinic
    for (const clinic of clinics) {
      await db.execute(`
        INSERT INTO doctors (clinic_id, name, specialization, experience, fee) VALUES
        (?, 'Dr. Sharma', 'Dentist', '10 years', 500.00),
        (?, 'Dr. Mehta', 'Orthodontist', '8 years', 800.00),
        (?, 'Dr. Patel', 'General Dentist', '12 years', 400.00)
      `, [clinic.id, clinic.id, clinic.id]);
    }

    console.log('✅ Sample data inserted successfully!');
  } catch (error) {
    console.error('❌ Error inserting sample data:', error);
  }
}

// Run if called directly
if (require.main === module) {
  createTables()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}

module.exports = { createTables, insertSampleData };
