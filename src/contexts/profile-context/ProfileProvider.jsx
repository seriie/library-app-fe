import { useEffect, useState } from "react";
import axios from "axios";
import { ProfileContext } from "./ProfileContext";

export default function ProfileProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const URL = import.meta.env.VITE_BACKEND_URL;

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      const res = await axios.get(`${URL}/api/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser(res.data.data);
    } catch (e) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <ProfileContext.Provider value={{ user, loading, fetchUserProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}

