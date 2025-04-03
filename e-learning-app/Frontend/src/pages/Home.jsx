import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/userContext";
import Sidebar from "../student/studentComponents/SideBar";

export default function Home() {
  const navigateTo = useNavigate();
  const { auth } = useContext(AuthContext);
  const [jwt, setJwt] = auth;

  const handleLogout = () => {
    setJwt(null); // Clear the token from context
    navigateTo("/"); // Redirect to the login page
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col p-6 relative w-full">
        {/* Logout button in top right corner */}
        <button
          onClick={handleLogout}
          className="absolute top-4 right-4 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Logout
        </button>

        {/* Page content */}
        <h1 className="text-2xl font-bold mb-6 text-center">
          Welcome to E-learning by SMU
        </h1>
      </div>
    </div>
  );
}
