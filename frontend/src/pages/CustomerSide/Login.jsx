import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Example authentication logic (replace with your backend API call)
    if (email.trim() !== '' && password.trim() !== '') {
      console.log({ email, password, rememberMe });
      navigate("/customer/dashboard"); // ✅ Redirect after login
    } else {
      alert("Please enter valid email and password");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-amber-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800">Sign In</h2>
          <p className="text-gray-500 mt-2">Welcome back! Please log in to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-400 focus:outline-none"
              placeholder="you@example.com"
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-400 focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="rounded border-gray-300"
              />
              Remember me
            </label>
            <Link to="/forgot-password" className="text-sm text-rose-500 hover:underline">
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02, boxShadow: "0 5px 15px rgba(244, 63, 94, 0.3)" }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 px-4 bg-gradient-to-r from-rose-500 to-amber-500 text-white font-semibold rounded-lg shadow hover:shadow-md transition-all"
          >
            Sign In
          </motion.button>
        </form>

        {/* Sign Up Link */}
        <p className="text-center text-sm text-gray-500">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-rose-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
