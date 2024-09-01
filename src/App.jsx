import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DataTable from "./components/DataTable";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/Dashboard";
import PageNotFound from "./pages/pageNotFound/PageNotFound";
import SecuredRoute from "./routes/SecuredRoutes";
import ProtectedRoute from "./routes/ProtectedRoutes";
import PrivateRoute from "./routes/PrivateRoutes";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/master-dashboard"
          element={
            <ProtectedRoute
              Component={Dashboard}
              componentName="Dashboard"
            />
          }
        />
        <Route
          path="/master-enroll"
          element={<PrivateRoute Component={DataTable} />}
        />{" "}
        {/* <Route path="/dashboard" element={<DataTable />} /> */}
        {/* <Route path="/" element={<DataTable />} /> */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
