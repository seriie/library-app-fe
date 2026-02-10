import { IoEye, IoEyeOff } from "react-icons/io5";

export default function RegisterForm({ title, handleSubmit, name, setName, email, setEmail, showPw, setShowPw, password, setPassword, confirmPassword, setConfirmPassword, showConfirmPw, setShowConfirmPw, error, isRegistering }) {
    return (
        <>
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
                {title}
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
                    className={`w-full p-2 rounded cursor-pointer text-white transition ${isRegistering
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gray-800 hover:bg-gray-600"
                        }`}
                >
                    {isRegistering ? "Creating account..." : "Sign Up"}
                </button>
            </form>
        </>
    )
}