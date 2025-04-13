import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/userContext";
import authService from "../services/authService";
import { getRoleFromToken } from "../utils/auth";

export default function AdminLogin() {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const [jwt, setJwt] = auth;
  const [formInput, setFormInput] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  // Redirect if already logged in as admin
  useEffect(() => {
    if (jwt) {
      const role = getRoleFromToken(jwt);
      if (role === "admin") {
        navigate("/admin/dashboard");
      } else {
        setError("Unauthorized access");
        setJwt(null); // Clear invalid token
      }
    }
  }, [jwt, navigate, setJwt]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await authService.login(
        formInput.email,
        formInput.password
      );

      const token = response.data.token;
      const role = getRoleFromToken(token);

      if (role !== "admin") {
        throw new Error("Invalid admin credentials");
      }

      setJwt(token); // Store the JWT
      navigate("/admin");
    } catch (error) {
      setError(error.response?.data?.message || "Admin login failed");
      console.error("Admin login error:", error);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gray-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Admin Portal"
          src="https://cdn-icons-png.flaticon.com/512/3209/3209268.png"
          className="mx-auto h-20 w-20"
        />
        <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-gray-900">
          Sign in as Admin
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Restricted access to authorized personnel only.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
        {error && (
          <div className="mb-4 p-2 text-sm text-red-600 bg-red-50 rounded-md">
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-900"
            >
              Admin Email
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formInput.email}
                onChange={(e) =>
                  setFormInput({ ...formInput, email: e.target.value })
                }
                className="block w-full rounded-md bg-white px-3 py-2 text-gray-900 border border-gray-300 shadow-sm focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                placeholder="admin@example.com"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formInput.password}
                onChange={(e) =>
                  setFormInput({ ...formInput, password: e.target.value })
                }
                className="block w-full rounded-md bg-white px-3 py-2 text-gray-900 border border-gray-300 shadow-sm focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Admin Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
