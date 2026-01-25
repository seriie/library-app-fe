import { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

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
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-100 via-gray-200 to-gray-300 px-4">
      <div className="w-full max-w-md bg-white/50 backdrop-blur-md border border-gray-300/40 rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="w-full px-4 py-2 rounded-lg bg-white/70 text-gray-900 placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-2 rounded-lg bg-white/70 text-gray-900 placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Password
            </label>
            <div className="relative">
              <div
                className="absolute right-3 top-3 cursor-pointer text-gray-600"
                onClick={() => setShowPw(!showPw)}
              >
                {showPw ? <IoEyeOff /> : <IoEye />}
              </div>
              <input
                type={showPw ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                className="w-full px-4 py-2 rounded-lg bg-white/70 text-gray-900 placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <div
                className="absolute right-3 top-3 cursor-pointer text-gray-600"
                onClick={() => setShowConfirmPw(!showConfirmPw)}
              >
                {showConfirmPw ? <IoEyeOff /> : <IoEye />}
              </div>
              <input
                type={showConfirmPw ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className="w-full px-4 py-2 rounded-lg bg-white/70 text-gray-900 placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
                required
              />
            </div>
          </div>

          {error && (
            <p className="p-2 bg-red-500/20 text-red-600 border border-red-500 rounded-md text-sm">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isRegistering}
            className={`w-full p-2 rounded text-white transition ${
              isRegistering
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gray-800 hover:bg-gray-600"
            }`}
          >
            {isRegistering ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            to="/auth/login"
            className="underline text-gray-800 hover:text-gray-700"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
