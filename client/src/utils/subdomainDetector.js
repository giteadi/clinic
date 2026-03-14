/**
 * Utility to detect clinic from subdomain
 * Extracts subdomain from current URL and maps it to clinic data
 */

export const getClinicFromSubdomain = () => {
  if (typeof window === 'undefined') return null;
  
  // For development, check URL query parameter first
  const urlParams = new URLSearchParams(window.location.search);
  const clinicParam = urlParams.get('clinic');
  if (clinicParam) {
    return clinicParam.toLowerCase();
  }
  
  const hostname = window.location.hostname;
  
  // Split hostname by dots
  const parts = hostname.split('.');
  
  // Check if we have a subdomain (not www, not localhost)
  if (parts.length >= 2) {
    const subdomain = parts[0];
    
    // Skip www and common subdomains
    if (subdomain !== 'www' && subdomain !== 'localhost') {
      return subdomain.toLowerCase();
    }
  }
  
  return null;
};

/**
 * Get clinic configuration based on subdomain
 */
export const getClinicConfig = async (subdomain) => {
  if (!subdomain) return null;
  
  try {
    // In production, this would be an API call
    // For now, return mock data based on common clinic types
    const clinicConfigs = {
      'dental': {
        id: 'dental',
        name: 'Smile Dental Clinic',
        type: 'dental',
        logo: '/logos/dental-clinic.png',
        primaryColor: '#3B82F6',
        secondaryColor: '#60A5FA',
        description: 'Your trusted dental care partner',
        specialties: ['General Dentistry', 'Orthodontics', 'Cosmetic Dentistry'],
        images: ['/images/dental-clinic-1.jpg', '/images/dental-clinic-2.jpg'],
        videos: ['/videos/dental-tour.mp4']
      },
      'medical': {
        id: 'medical',
        name: 'Care Medical Center',
        type: 'medical',
        logo: '/logos/medical-center.png',
        primaryColor: '#10B981',
        secondaryColor: '#34D399',
        description: 'Comprehensive healthcare services',
        specialties: ['General Practice', 'Pediatrics', 'Internal Medicine'],
        images: ['/images/medical-center-1.jpg', '/images/medical-center-2.jpg'],
        videos: ['/videos/medical-tour.mp4']
      },
      'ortho': {
        id: 'ortho',
        name: 'OrthoCare Clinic',
        type: 'orthopedic',
        logo: '/logos/ortho-clinic.png',
        primaryColor: '#F59E0B',
        secondaryColor: '#FCD34D',
        description: 'Specialized orthopedic care',
        specialties: ['Joint Replacement', 'Sports Medicine', 'Spine Surgery'],
        images: ['/images/ortho-clinic-1.jpg', '/images/ortho-clinic-2.jpg'],
        videos: ['/videos/ortho-tour.mp4']
      }
    };
    
    return clinicConfigs[subdomain] || null;
  } catch (error) {
    console.error('Error fetching clinic config:', error);
    return null;
  }
};

/**
 * Check if current URL has a clinic subdomain
 */
export const hasClinicSubdomain = () => {
  return getClinicFromSubdomain() !== null;
};

/**
 * Get clinic-specific API base URL
 */
export const getClinicApiUrl = (subdomain) => {
  if (!subdomain) return '/api';
  
  // In development, use the same API
  if (process.env.NODE_ENV === 'development') {
    return '/api';
  }
  
  // In production, you might have clinic-specific APIs
  return `https://api.${subdomain}.clinic.com`;
};
