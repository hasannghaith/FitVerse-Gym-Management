import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [state, setState] = useState({ 
    username: "", 
    password: "" 
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    setState({ ...state, [name]: value });
    setError(""); // Clear error when user types
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await onLogin(state.username, state.password);
      
      if (result.success) {
        // Login successful
        if (result.userType === "admin") {
          navigate('/admin');
        } else {
          navigate('/services');
        }
      } else {
        setError(result.message || "Invalid credentials");
      }
    } catch (err) {
      setError("Server error. Please try again.");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
    
    setState({ username: "", password: "" });
  };

  return (
    <div className="bg-black min-h-screen flex justify-center items-center p-4 pt-28">
      <div className="bg-gray-800 text-white p-8 rounded-2xl shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold mb-6 text-center">Login to FitVerse</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-900 rounded-lg">
            <p className="text-red-200 text-center">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Username</label>
            <input
              name="username"
              type="text"
              placeholder="Enter username"
              value={state.username}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00df9a]"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Enter password"
              value={state.password}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00df9a]"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-[#00df9a] text-black font-bold py-3 rounded-lg hover:bg-[#00c785] transition ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-6 p-4 bg-gray-900 rounded-lg">
          <p className="text-sm text-center text-gray-300 mb-2">
            Demo Credentials:
          </p>
          <div className="text-sm space-y-2">
            <div className="flex justify-between items-center p-2 bg-gray-800 rounded">
              <span><strong>Admin:</strong> admin / admin123</span>
              <span className="text-[#00df9a] text-xs">Dashboard Only</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-gray-800 rounded">
              <span><strong>User:</strong> user / user123</span>
              <span className="text-[#00df9a] text-xs">Full Website Access</span>
            </div>
          </div>
          <p className="text-xs text-center mt-3 text-gray-400">
            Admin can only access Dashboard. User can access all shopping features.
          </p>
        </div>

        <div className="mt-4 p-3 bg-blue-900 rounded-lg">
          <p className="text-sm text-center text-blue-200">
            🔒 Login required to access Services, Equipment, and Cart features
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;