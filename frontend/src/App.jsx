import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

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
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
