import { Navigate } from "react-router-dom";
import { useRole } from "../contexts/role-context/RoleContext";

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const { isAdmin, isOwner } = useRole();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin && !isOwner) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default AdminRoute;