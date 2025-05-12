import React from "react";
import { Link } from "react-router-dom";

// Icons (you can move these to a separate icons.js file later)
const DashboardIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
    />
  </svg>
);

const UsersIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
    />
  </svg>
);

const TeachersIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
    />
  </svg>
);

const CoursesIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
    />
  </svg>
);

const EnrollmentsIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
    />
  </svg>
);

const NavItem = ({ icon, label, active, onClick }) => (
  <li>
    <button
      onClick={onClick}
      className={`flex items-center space-x-2 w-full p-3 rounded-lg transition-colors ${
        active ? "bg-indigo-700" : "hover:bg-indigo-700/50"
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  </li>
);

const Sidebar = ({ activeTab, setActiveTab }) => {
  return (
    <div className="w-64 bg-indigo-800 text-white">
      <div className="p-4 border-b border-indigo-700">
        <h1 className="text-xl font-bold">Admin Portal</h1>
      </div>
      <nav className="p-4">
        <ul className="space-y-2">
          <NavItem
            icon={<DashboardIcon />}
            label="Dashboard"
            active={activeTab === "dashboard"}
            onClick={() => setActiveTab("dashboard")}
          />
          <NavItem
            icon={<UsersIcon />}
            label="Students"
            active={activeTab === "students"}
            onClick={() => setActiveTab("students")}
          />
          <NavItem
            icon={<TeachersIcon />}
            label="Teachers"
            active={activeTab === "teachers"}
            onClick={() => setActiveTab("teachers")}
          />
          <NavItem
            icon={<CoursesIcon />}
            label="Courses"
            active={activeTab === "courses"}
            onClick={() => setActiveTab("courses")}
          />
          <NavItem
            icon={<EnrollmentsIcon />}
            label="Enrollments"
            active={activeTab === "enrollments"}
            onClick={() => setActiveTab("enrollments")}
          />
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
