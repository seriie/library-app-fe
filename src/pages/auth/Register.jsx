import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

// Component
import RegisterForm from "../../components/auth/RegisterForm";
import Foot from "../../components/auth/Foot";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);

  const URL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsRegistering(true);
    setError("");

    if (password.length < 8) {
      setError("Password must be atleast 8 character");
      setIsRegistering(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsRegistering(false);
      return;
    }

    try {
      await axios.post(`${URL}/api/auth/register`, {
        name,
        email,
        password,
      });

      navigate("/auth/login");
    } catch (err) {
      const msg =
        err.response?.data?.message || "Registration failed, try again";
      setError(msg);
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-100 via-gray-200 to-gray-300 px-4">
        <div className="w-full max-w-md bg-white/50 backdrop-blur-md border border-gray-300/40 rounded-2xl shadow-xl p-8">
          <RegisterForm title="Create an Account" name={name} setName={setName} email={email} setEmail={setEmail} password={password} setPassword={setPassword} showPw={showPw} setShowPw={setShowPw} confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword} showConfirmPw={showConfirmPw} setShowConfirmPw={setShowConfirmPw} handleSubmit={handleSubmit} isRegistering={isRegistering} error={error}  />
          <Foot memberOrNo="Already have an account?" action="Sign in" href="/auth/login" />
        </div>
      </div>
    </>
  );
}
