/**
 * Protected booking routes that require authentication
 */
export const PROTECTED_BOOKING_ROUTES = [
  'clinic-selection',
  'doctor-selection', 
  'doctor-booking',
  'booking-confirmation',
  'admin-book-appointment'
];

/**
 * Helper function to check if a route is a protected booking route
 * @param {string} route - The route name to check
 * @returns {boolean} - True if the route is a protected booking route
 */
export const isProtectedBookingRoute = (route) => {
  return PROTECTED_BOOKING_ROUTES.includes(route);
};

/**
 * Helper function to handle safe navigation to booking routes
 * If user is not authenticated, redirects to login first
 * @param {string} targetRoute - The booking route to navigate to
 * @param {boolean} isAuthenticated - Whether user is authenticated
 * @param {function} setView - The view setter function from CliniqPro
 * @returns {void}
 */
export const handleBookingNavigation = (targetRoute, isAuthenticated, setView) => {
  if (!isAuthenticated) {
    // Show login page first
    console.log('🔐 User not authenticated. Redirecting to login before booking:', { targetRoute });
    setView('login');
    return false;
  }
  
  // User is authenticated, allow navigation to booking route
  setView(targetRoute);
  return true;
};

export default {
  PROTECTED_BOOKING_ROUTES,
  isProtectedBookingRoute,
  handleBookingNavigation
};
