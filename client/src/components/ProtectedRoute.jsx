import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import LoginPage from './pages/LoginPage';

// Role-based access configuration
const ROLE_ACCESS = {
  guest: ['home', 'doctors', 'clinics', 'appointment', 'login'],
  patient: ['home', 'doctors', 'clinics', 'appointment', 'patient-dashboard', 'login', 'clinic-selection', 'doctor-selection', 'doctor-booking', 'booking-confirmation'],
  admin: ['home', 'doctors', 'clinics', 'appointment', 'admin-dashboard', 'login', 'doctor-selection', 'doctor-booking', 'booking-confirmation', 'manage-patients', 'view-reports', 'clinic-settings', 'admin-appointment', 'admin-book-appointment'],
  superadmin: ['home', 'doctors', 'clinics', 'appointment', 'admin-dashboard', 'superadmin-dashboard', 'login', 'add-clinic', 'manage-users', 'analytics', 'system-config', 'system-health', 'broadcast', 'clinic-selection', 'doctor-selection', 'doctor-booking', 'booking-confirmation', 'manage-patients', 'view-reports', 'clinic-settings', 'admin-appointment', 'admin-book-appointment']
};

export default function ProtectedRoute({ children, view, setView }) {
  const { isAuthenticated, user } = useSelector(state => state.auth);
  
  // Get current user role or default to guest
  const userRole = user?.role || 'guest';
  
  // Check if user has access to this view
  const hasAccess = ROLE_ACCESS[userRole]?.includes(view);
  
  // Public routes that don't require authentication
  const publicRoutes = ['home', 'doctors', 'clinics', 'appointment', 'login'];
  
  // Dashboard mapping for redirects
  const dashboardMap = {
    patient: 'patient-dashboard',
    admin: 'admin-dashboard',
    superadmin: 'superadmin-dashboard'
  };
  
  // Determine if redirect is needed
  const needsAuthRedirect = !isAuthenticated && !publicRoutes.includes(view);
  const needsRoleRedirect = isAuthenticated && !hasAccess;
  const needsLoginRedirect = isAuthenticated && view === 'login';
  
  // Handle redirects with useEffect
  useEffect(() => {
    if (needsAuthRedirect) {
      // Will render LoginPage component, no redirect needed
      return;
    }
    
    if (needsRoleRedirect || needsLoginRedirect) {
      const redirectView = dashboardMap[userRole] || 'home';
      setView(redirectView);
    }
  }, [needsAuthRedirect, needsRoleRedirect, needsLoginRedirect, userRole, setView]);
  
  // If trying to access protected route without authentication
  if (needsAuthRedirect) {
    return <LoginPage setView={setView} />;
  }
  
  // If user doesn't have role-based access or is authenticated but trying to access login
  if (needsRoleRedirect || needsLoginRedirect) {
    return null;
  }
  
  // All checks passed, render the children
  return children;
}
