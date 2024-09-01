import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

const SecuredRoute = ({ Component, allowedRole }) => {
  const userDetailsCookie = Cookies.get("userDetails");
  const userDetails = userDetailsCookie ? JSON.parse(decodeURIComponent(userDetailsCookie)) : null;
  const isAuthenticated = userDetails && userDetails.accessList !== null;
  const hasRequiredRole = isAuthenticated && userDetails.role === allowedRole;

  return isAuthenticated && hasRequiredRole ? <Component /> :
  <Navigate to="/master-dashboard" />;
 
};

export default SecuredRoute;
