import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const navigate = useNavigate();

  const [state, setState] = useState({
    username: "",
    password: "",
    error: "",
    loading: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // ✅ FIX: correct spread
    setState((prev) => ({ ...prev, [name]: value, error: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setState((prev) => ({ ...prev, loading: true, error: "" }));

    try {
      // ✅ Send as object (matches updated App.js handleLogin)
      const result = await onLogin({
        username: state.username,
        password: state.password,
      });

      if (result?.success) {
        // If admin, go to admin dashboard, else go to home
        if (result.userType === "admin") navigate("/admin");
        else navigate("/");
      } else {
        setState((prev) => ({
          ...prev,
          error: result?.message || "Invalid credentials",
          loading: false,
        }));
      }
    } catch (err) {
      console.error("LOGIN PAGE ERROR:", err);
      setState((prev) => ({
        ...prev,
        error: "Server error",
        loading: false,
      }));
    }
  };

  return (
    <div className="bg-black min-h-screen flex flex-col justify-center items-center px-4">
      <div className="bg-gray-900 p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-white text-center mb-6">Login</h1>

        {state.error && (
          <div className="bg-red-500 text-white p-3 rounded mb-4 text-center">
            {state.error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white mb-2">Username</label>
            <input
              type="text"
              name="username"
              value={state.username}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-[#00df9a]"
              placeholder="Enter username"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-white mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={state.password}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-[#00df9a]"
              placeholder="Enter password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={state.loading}
            className={`w-full font-bold py-2 px-4 rounded-lg transition duration-300 ${
              state.loading
                ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                : "bg-[#00df9a] text-black hover:bg-[#00c785]"
            }`}
          >
            {state.loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-6 text-gray-300 text-sm">
          <p className="mb-1">
            <span className="text-white font-semibold">Admin:</span> admin / admin123
          </p>
          <p>
            <span className="text-white font-semibold">User:</span> user / user123
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
