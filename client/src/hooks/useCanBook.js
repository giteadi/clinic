import { useSelector } from 'react-redux';

/**
 * Custom hook to check if user is authenticated and can proceed with booking
 * Returns an object with:
 * - canBook: boolean indicating if user can browse booking pages
 * - isAuthenticated: boolean indicating if user is logged in
 * - user: authenticated user object or null
 */
export const useCanBook = () => {
  const { isAuthenticated, user } = useSelector(state => state.auth);
  
  return {
    canBook: isAuthenticated,
    isAuthenticated,
    user: isAuthenticated ? user : null
  };
};

export default useCanBook;
