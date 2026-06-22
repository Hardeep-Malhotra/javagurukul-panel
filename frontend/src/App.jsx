import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import StudentManagement from "./pages/StudentManagement";
import AdminLayout from "./components/Layout/AdminLayout";

//  Secure Routing For Checking if admin session exists in LocalStorage
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("adminUser");
  // if token is not then redirect on /login
  return token ? children : <Navigate to="/" />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* All admin pages share AdminLayout (Sidebar + Header stay fixed) */}
        <Route
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/students" element={<StudentManagement />} />
          {/* Add more admin pages here as they get built:
          <Route path="/courses" element={<Courses />} />
          <Route path="/subjects" element={<Subjects />} />
          */}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
