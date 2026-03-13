import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import LoginPage from './pages/LoginPage';

// Role-based access configuration
const ROLE_ACCESS = {
  guest: ['home', 'doctors', 'clinics', 'appointment', 'login'],
  patient: ['home', 'doctors', 'clinics', 'appointment', 'patient-dashboard', 'login'],
  admin: ['home', 'doctors', 'clinics', 'appointment', 'admin-dashboard', 'login'],
  superadmin: ['home', 'doctors', 'clinics', 'appointment', 'admin-dashboard', 'superadmin-dashboard', 'login', 'add-clinic', 'manage-users', 'analytics', 'system-config', 'system-health', 'broadcast']
};

export default function ProtectedRoute({ children, view, setView }) {
  const { isAuthenticated, user } = useSelector(state => state.auth);
  
  // Get current user role or default to guest
  const userRole = user?.role || 'guest';
  
  // Check if user has access to this view
  const hasAccess = ROLE_ACCESS[userRole]?.includes(view);
  
  // Public routes that don't require authentication
  const publicRoutes = ['home', 'doctors', 'clinics', 'appointment', 'login'];
  
  // If trying to access protected route without authentication
  if (!isAuthenticated && !publicRoutes.includes(view)) {
    return <LoginPage setView={setView} />;
  }
  
  // If user doesn't have role-based access
  if (isAuthenticated && !hasAccess) {
    // Redirect to appropriate dashboard based on role
    const dashboardMap = {
      patient: 'patient-dashboard',
      admin: 'admin-dashboard',
      superadmin: 'superadmin-dashboard'
    };
    
    const redirectView = dashboardMap[userRole] || 'home';
    useEffect(() => {
      setView(redirectView);
    }, [redirectView, setView]);
    return null;
  }
  
  // If user is authenticated but trying to access login, redirect to dashboard
  if (isAuthenticated && view === 'login') {
    const dashboardMap = {
      patient: 'patient-dashboard',
      admin: 'admin-dashboard',
      superadmin: 'superadmin-dashboard'
    };
    
    const redirectView = dashboardMap[userRole] || 'home';
    useEffect(() => {
      setView(redirectView);
    }, [redirectView, setView]);
    return null;
  }
  
  // All checks passed, render the children
  return children;
}
