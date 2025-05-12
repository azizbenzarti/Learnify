import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/userContext";
import authService from "../services/authService";
import NavigationHeader from "../components/NavigationHeader";

import { getRoleFromToken } from "../utils/auth";

export default function Login() {
  const navigateTo = useNavigate();
  const { auth } = useContext(AuthContext);
  const [jwt, setJwt] = auth;
  const [formInput, setFormInput] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  // UseEffect to handle navigation after jwt is updated
  useEffect(() => {
    if (jwt) {
      // Get role from token
      const role = getRoleFromToken(jwt);
      // Redirect based on role
      if (role === "tutor") {
        navigateTo("/teacher");
      } else if (role === "student") {
        navigateTo("/student");
      } 
    }
  }, [jwt, navigateTo]);

  const handleForm = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await authService.login(
        formInput.email,
        formInput.password
      );

      const token = response.data.token;
      setJwt(token); // Update the JWT in context

      setFormInput({ email: "", password: "" });
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">

      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Learnify"
          src="https://t4.ftcdn.net/jpg/01/28/93/91/360_F_128939133_0WXTVdZ1bv1NXusQsdYYJLIwTVoXHqQ7.jpg"
          className="mx-auto h-24 w-24"
        />
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleForm}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={formInput.email}
                onChange={(e) =>
                  setFormInput({ ...formInput, email: e.target.value })
                }
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-900"
              >
                Password
              </label>
              <div className="text-sm">
                <a
                  href="/forget-password"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                value={formInput.password}
                onChange={(e) =>
                  setFormInput({ ...formInput, password: e.target.value })
                }
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Display error message if login fails */}
          {error && <div className="text-sm text-red-600">{error}</div>}

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not registered?{" "}
          <span
            onClick={() => navigateTo("/signup")}
            className="font-semibold text-indigo-600 hover:text-indigo-500 cursor-pointer"
          >
            Create an account
          </span>
        </p>
      </div>
    </div>
  );
}
