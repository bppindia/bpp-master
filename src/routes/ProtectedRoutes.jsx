import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ Component,  componentName }) => {
  let isAuthenticated = false;


  // list for special access
  const accessComponentList = [
    "Dashboard"
  ];

  const authFlag = Cookies.get("authToken") !== null;

  const accessVal = JSON.parse(
    decodeURIComponent(Cookies.get("userDetails"))
  ).accessList;

  if (accessComponentList.includes(componentName)) {
    isAuthenticated = accessVal.includes(componentName) && authFlag;
  }

  return isAuthenticated ? <Component /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
