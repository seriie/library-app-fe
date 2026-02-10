import { useProfile } from "../profile-context/ProfileContext";
import { RoleContext } from "./RoleContext";

export default function RoleProvider({ children }) {
  const { user, loading } = useProfile();

  if (loading) {
    return <div className="p-6">Loading... 🌀</div>;
  }

  const role = user?.role || "guest";

  const isOwner = role === "owner";
  const isAdmin = role === "admin";
  const isMember = role === "member";

  return (
    <RoleContext.Provider value={{ role, isAdmin, isOwner, isMember }}>
      {children}
    </RoleContext.Provider>
  );
}