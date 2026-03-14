const db = require('../config/database');

/**
 * CRITICAL MIDDLEWARE - Detects clinic from subdomain
 * This is the core of the multi-tenant SaaS system
 */
const clinicMiddleware = async (req, res, next) => {
  try {
    // Get subdomain from hostname
    const hostname = req.hostname;
    console.log(`🔍 Request from: ${hostname}`);
    
    // Extract subdomain
    const subdomain = hostname.split('.')[0];
    
    // Skip for localhost, www, or main domain
    if (hostname === 'localhost' || subdomain === 'www' || hostname === 'yourapp.com') {
      req.clinic = null;
      req.clinicId = null;
      return next();
    }
    
    // Query database for clinic
    const query = `
      SELECT id, name, slug, phone, email, address, logo, created_at 
      FROM clinics 
      WHERE slug = ? 
      LIMIT 1
    `;
    
    const [clinics] = await db.execute(query, [subdomain]);
    
    if (clinics.length === 0) {
      console.log(`❌ No clinic found for subdomain: ${subdomain}`);
      req.clinic = null;
      req.clinicId = null;
      return next();
    }
    
    const clinic = clinics[0];
    console.log(`✅ Clinic detected: ${clinic.name} (${clinic.slug})`);
    
    // Attach clinic data to request
    req.clinic = clinic;
    req.clinicId = clinic.id;
    
    next();
  } catch (error) {
    console.error('❌ Clinic middleware error:', error);
    req.clinic = null;
    req.clinicId = null;
    next();
  }
};

module.exports = clinicMiddleware;
