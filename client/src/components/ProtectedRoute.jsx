import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import LoginPage from './pages/LoginPage';

// Role-based access configuration
const ROLE_ACCESS = {
  guest: ['home', 'doctors', 'clinics', 'appointment', 'login', 'superadmin-login'],
  patient: ['home', 'doctors', 'clinics', 'appointment', 'patient-dashboard', 'login', 'clinic-selection', 'doctor-selection', 'doctor-booking', 'booking-confirmation'],
  admin: ['home', 'doctors', 'clinics', 'appointment', 'admin-dashboard', 'login', 'doctor-selection', 'doctor-booking', 'booking-confirmation', 'manage-patients', 'view-reports', 'clinic-settings', 'admin-appointment', 'admin-book-appointment'],
  superadmin: ['*'] // Super admin can access everything
};

// Protected booking routes - require authentication
const PROTECTED_BOOKING_ROUTES = ['clinic-selection', 'doctor-selection', 'doctor-booking', 'booking-confirmation', 'admin-book-appointment'];

export default function ProtectedRoute({ children, view, setView }) {
  const { isAuthenticated, user } = useSelector(state => state.auth);
  
  // Get current subdomain
  const getCurrentSubdomain = () => {
    const hostname = window.location.hostname;
    if (hostname === 'localhost' || hostname === '127.0.0.1') return null;
    return hostname.split('.')[0];
  };
  
  // Check if user belongs to current clinic
  const validateClinicAccess = () => {
    const subdomain = getCurrentSubdomain();
    
    // Skip validation for main domain, localhost, or super admin
    if (!subdomain || user?.role === 'superadmin') {
      return true;
    }
    
    // For patients, check if they have linked clinic matching current subdomain
    if (user?.role === 'patient' && user?.linkedClinic) {
      // This should match the clinic slug/subdomain
      // For now, we'll assume the linkedClinic has a slug property
      return user.linkedClinic.slug === subdomain || user.linkedClinic.id === 1; // Mock validation
    }
    
    // For admins, check if they belong to this clinic
    if (user?.role === 'admin' && user?.clinicId) {
      // In real app, this would check against clinic data
      return true; // Mock validation
    }
    
    return false;
  };
  
  console.log('🔍 ProtectedRoute Debug:', { 
    view, 
    isAuthenticated, 
    userRole: user?.role,
    user: user ? { id: user.id, name: user.name, role: user.role } : null,
    currentSubdomain: getCurrentSubdomain(),
    hasClinicAccess: validateClinicAccess(),
    timestamp: new Date().toISOString()
  });
  
  // Get current user role or default to guest
  const userRole = user?.role || 'guest';
  
  // Check if user has access to this view
  const hasAccess = ROLE_ACCESS[userRole]?.includes(view) || ROLE_ACCESS[userRole]?.includes('*');
  
  // Public routes that don't require authentication
  const publicRoutes = ['home', 'doctors', 'clinics', 'appointment', 'login', 'superadmin-login'];
  
  // Dashboard mapping for redirects
  const dashboardMap = {
    patient: 'patient-dashboard',
    admin: 'admin-dashboard',
    superadmin: 'superadmin-dashboard'
  };
  
  // Determine if redirect is needed
  const needsAuthRedirect = !isAuthenticated && (!publicRoutes.includes(view) || PROTECTED_BOOKING_ROUTES.includes(view)) && view !== 'superadmin-login';
  const needsRoleRedirect = isAuthenticated && !hasAccess && view !== 'login'; // Don't redirect if user is trying to access login
  const needsClinicRedirect = isAuthenticated && hasAccess && !validateClinicAccess() && view !== 'clinic-selection';
  const needsLoginRedirect = false; // Never redirect from login page - let user stay on login

  console.log('🔍 ProtectedRoute Logic:', { 
    needsAuthRedirect, 
    needsRoleRedirect, 
    needsClinicRedirect,
    needsLoginRedirect, 
    hasAccess, 
    userRole, 
    view,
    isProtectedBookingRoute: PROTECTED_BOOKING_ROUTES.includes(view),
    timestamp: new Date().toISOString()
  });
  
  // Handle redirects with useEffect
  useEffect(() => {
    if (needsAuthRedirect) {
      // Log when user tries to access booking without authentication
      if (PROTECTED_BOOKING_ROUTES.includes(view)) {
        console.log('🔐 BOOKING ACCESS DENIED - Redirecting to login:', {
          attemptedView: view,
          isAuthenticated,
          timestamp: new Date().toISOString()
        });
      }
      // Will render LoginPage component, no redirect needed
      return;
    }
    
    if (needsClinicRedirect) {
      console.log('🔄 ProtectedRoute - Clinic access denied, redirecting to clinic selection:', { 
        userRole, 
        currentSubdomain: getCurrentSubdomain(),
        userClinic: user?.linkedClinic?.name || 'None'
      });
      setView('clinic-selection');
      return;
    }
    
    if (needsRoleRedirect) {
      const redirectView = dashboardMap[userRole] || 'home';
      console.log('🔄 ProtectedRoute - Role redirect triggered:', { userRole, redirectView, view });
      setView(redirectView);
    }
  }, [needsAuthRedirect, needsClinicRedirect, needsRoleRedirect, userRole, setView]);
  
  // If trying to access protected route without authentication
  if (needsAuthRedirect) {
    return <LoginPage setView={setView} />;
  }
  
  // If user doesn't have clinic access
  if (needsClinicRedirect) {
    return null; // Will redirect in useEffect
  }
  
  // If user doesn't have role-based access
  if (needsRoleRedirect) {
    return null;
  }
  
  // All checks passed, render the children
  return children;
}
