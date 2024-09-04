import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ Component }) => {
  const userDetailsCookie = Cookies.get("userDetails");
  const isAuthenticated =
    userDetailsCookie &&
    JSON.parse(decodeURIComponent(userDetailsCookie)).accessList !== null;

  return isAuthenticated ? <Component /> : <Navigate to="/login" />;
};

export default PrivateRoute;
