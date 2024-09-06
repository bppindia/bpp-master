import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  // If token exists, user is authenticated
  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
