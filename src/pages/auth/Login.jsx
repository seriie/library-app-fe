import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../../contexts/profile-context/ProfileContext";

// Components
import LoginForm from "../../components/auth/LoginForm";
import Foot from "../../components/auth/Foot";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showPw, setShowPw] = useState(false);

  const URL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const { fetchUserProfile } = useProfile();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setError("");

    try {
      const res = await axios.post(`${URL}/api/auth/login`, {
        email,
        password,
      });

      const token = res.data.data.token;

      localStorage.setItem("token", token);

      setIsLoggingIn(true);
      await fetchUserProfile();
      navigate("/dashboard");
    } catch (err) {
      const msg =
        err.response?.data?.message || "Login failed, try again";
      console.log(err.response)
      setError(msg);
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-100 via-gray-200 to-gray-300 px-4">
      <div className="w-full max-w-md bg-white/50 backdrop-blur-md border border-gray-300/40 rounded-2xl shadow-xl p-8">
        <LoginForm title="Login an Account" setEmail={setEmail} email={email} setPassword={setPassword} password={password} showPw={showPw} setShowPw={setShowPw} error={error} handleSubmit={handleSubmit} isLoggingIn={isLoggingIn} />
        <Foot memberOrNo="Not a member yet?" action="Sign up" href="/auth/register" />
      </div>
    </div>
  );
}