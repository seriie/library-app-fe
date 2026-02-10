import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Layout from "./components/layout/Layout";

import Header from "./components/Header";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/Dashboard";

import ProtectedRoute from "./routes/protected.route";
import PublicRoute from "./routes/public.route";
import AdminRoute from "./routes/admin.route";
import AdminDashboard from "./pages/admin/AdminDashboard";
import { useEffect } from "react";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token && location.pathname !== '/auth/register') return navigate("/auth/login");
  }, [])

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/auth/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/auth/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Layout childern={<AdminDashboard />} />
            </AdminRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout childern={<Dashboard />} />
            </ProtectedRoute>
          }
        />

      </Routes>
    </>
  );
}

export default App;