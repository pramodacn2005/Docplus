import React, { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DoctorContext } from "../context/DoctorContext";
import { AdminContext } from "../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";
import { FiLogIn, FiUser, FiLock, FiArrowRight } from "react-icons/fi";

const Login = () => {
  const [authType, setAuthType] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);

  const backendUrl = (import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000').replace(/\s+/g, '');
  const { setDToken } = useContext(DoctorContext);
  const { setAToken } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    console.log('Login attempt:', { authType, email, backendUrl });

    try {
      const endpoint =
        authType === "Admin" ? "/api/admin/login" : "/api/doctor/login";
      console.log('Making request to:', backendUrl + endpoint);
      
      const { data } = await axios.post(backendUrl + endpoint, {
        email,
        password,
      });

      console.log('Login response:', data);

      if (data.success) {
        const tokenKey = authType === "Admin" ? "aToken" : "dToken";
        const setToken = authType === "Admin" ? setAToken : setDToken;

        setToken(data.token);
        localStorage.setItem(tokenKey, data.token);
        toast.success(`Welcome back, ${authType}!`);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAuthType = () => {
    setIsFlipping(true);
    setTimeout(() => {
      setAuthType((prev) => (prev === "Admin" ? "Doctor" : "Admin"));
      setIsFlipping(false);
    }, 300);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <motion.div
          key={authType}
          initial={{ rotateY: isFlipping ? 90 : 0 }}
          animate={{ rotateY: isFlipping ? 0 : 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-center">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <FiLogIn className="mx-auto text-white" size={40} />
            </motion.div>
            <h1 className="text-2xl font-bold text-white mt-4">
              {authType} Portal
            </h1>
          </div>

          {/* Form */}
          <form onSubmit={onSubmitHandler} className="p-8 space-y-6">
            {/* Email Field */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="text-gray-400" />
                </div>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className="w-full pl-10 pr-4 py-3 border-b border-gray-200 focus:border-blue-500 focus:outline-none"
                  type="email"
                  placeholder="Email address"
                  required
                />
              </div>
            </motion.div>

            {/* Password Field */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="text-gray-400" />
                </div>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  className="w-full pl-10 pr-4 py-3 border-b border-gray-200 focus:border-blue-500 focus:outline-none"
                  type="password"
                  placeholder="Password"
                  required
                />
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className={`w-full flex items-center justify-center py-3 px-4 rounded-lg text-white font-medium ${
                isLoading ? "bg-blue-400" : "bg-blue-500 hover:bg-blue-600"
              } transition-colors`}
            >
              {isLoading ? (
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                <>
                  <span>Sign In</span>
                  <FiArrowRight className="ml-2" />
                </>
              )}
            </motion.button>

            {/* Toggle Auth Type */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-center pt-4"
            >
              <button
                type="button"
                onClick={toggleAuthType}
                className="text-blue-500 hover:text-blue-700 text-sm font-medium transition-colors"
              >
                {authType === "Admin" ? (
                  <span>Are you a Doctor? Sign in here</span>
                ) : (
                  <span>Are you an Admin? Sign in here</span>
                )}
              </button>
            </motion.div>
          </form>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-gray-500 text-xs mt-6"
        >
          <p>Secure authentication system</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
