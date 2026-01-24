import { useContext } from "react";
import { ProfileContext } from "../contexts/profile-context/ProfileContext";

export default function Dashboard() {
  const { user } = useContext(ProfileContext);
  console.log(user)

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h1>Halo, {user.name} 👋</h1>
      <p>Email: {user.email}</p>
    </div>
  );
}