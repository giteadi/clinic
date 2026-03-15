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

export default function ProtectedRoute({ children, view, setView }) {
  const { isAuthenticated, user } = useSelector(state => state.auth);
  
  console.log('🔍 ProtectedRoute Debug:', { 
    view, 
    isAuthenticated, 
    userRole: user?.role,
    user: user ? { id: user.id, name: user.name, role: user.role } : null,
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
  const needsAuthRedirect = !isAuthenticated && !publicRoutes.includes(view) && view !== 'superadmin-login';
  const needsRoleRedirect = isAuthenticated && !hasAccess && view !== 'login'; // Don't redirect if user is trying to access login
  const needsLoginRedirect = false; // Never redirect from login page - let user stay on login

  console.log('🔍 ProtectedRoute Logic:', { 
    needsAuthRedirect, 
    needsRoleRedirect, 
    needsLoginRedirect, 
    hasAccess, 
    userRole, 
    view,
    timestamp: new Date().toISOString()
  });
  
  // Handle redirects with useEffect
  useEffect(() => {
    if (needsAuthRedirect) {
      // Will render LoginPage component, no redirect needed
      return;
    }
    
    if (needsRoleRedirect) {
      const redirectView = dashboardMap[userRole] || 'home';
      console.log('🔄 ProtectedRoute - Role redirect triggered:', { userRole, redirectView, view });
      setView(redirectView);
    }
  }, [needsAuthRedirect, needsRoleRedirect, userRole, setView]);
  
  // If trying to access protected route without authentication
  if (needsAuthRedirect) {
    return <LoginPage setView={setView} />;
  }
  
  // If user doesn't have role-based access
  if (needsRoleRedirect) {
    return null;
  }
  
  // All checks passed, render the children
  return children;
}
