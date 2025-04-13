import React, { useState } from "react";
import { Link } from "react-router-dom";

const UsersIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
    />
  </svg>
);
const CoursesIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
    />
  </svg>
);
const EnrollmentsIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
    />
  </svg>
);
const DashboardIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
    />
  </svg>
);

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data - replace with real data from your backend
  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "student",
      status: "active",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "tutor",
      status: "active",
    },
  ];

  const courses = [
    {
      id: 1,
      title: "Introduction to React",
      tutor: "Jane Smith",
      students: 25,
      status: "published",
    },
    {
      id: 2,
      title: "Advanced JavaScript",
      tutor: "Mike Johnson",
      students: 18,
      status: "draft",
    },
  ];

  const enrollments = [
    {
      id: 1,
      student: "John Doe",
      course: "Introduction to React",
      date: "2023-05-15",
      status: "active",
    },
    {
      id: 2,
      student: "Alice Brown",
      course: "Advanced JavaScript",
      date: "2023-05-10",
      status: "completed",
    },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "users":
        return <UsersTable data={users} />;
      case "courses":
        return <CoursesTable data={courses} />;
      case "enrollments":
        return <EnrollmentsTable data={enrollments} />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
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
              active={activeTab === "users"}
              onClick={() => setActiveTab("users")}
            />
            <NavItem
              icon={<CoursesIcon />}
              label="Teachers"
              active={activeTab === "Teachers"}
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

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Top Bar */}
        <header className="bg-white shadow-sm">
          <div className="flex justify-between items-center p-4">
            <h2 className="text-xl font-semibold text-gray-800 capitalize">
              {activeTab === "dashboard" ? "Overview" : activeTab}
            </h2>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <svg
                  className="w-5 h-5 absolute left-3 top-2.5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                <span className="text-indigo-800 font-medium">A</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="p-6">{renderContent()}</main>
      </div>
    </div>
  );
}

// Components
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

const DashboardOverview = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
    <StatCard title="Total Users" value="1,234" icon="👥" trend="↑ 12%" />
    <StatCard title="Active Courses" value="56" icon="📚" trend="↑ 5%" />
    <StatCard title="Enrollments" value="3,456" icon="🎓" trend="↑ 24%" />
    <StatCard title="Revenue" value="$28,900" icon="💰" trend="↑ 8%" />
  </div>
);

const StatCard = ({ title, value, icon, trend }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm">
    <div className="flex justify-between">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-2xl font-bold mt-1">{value}</p>
      </div>
      <span className="text-3xl">{icon}</span>
    </div>
    <p className="text-green-500 text-sm mt-2">{trend}</p>
  </div>
);

const UsersTable = ({ data }) => (
  <CrudTable
    title="Manage Users"
    columns={["ID", "Name", "Email", "Role", "Status", "Actions"]}
    data={data}
    onAdd={() => console.log("Add new user")}
  />
);

const CoursesTable = ({ data }) => (
  <CrudTable
    title="Manage Courses"
    columns={["ID", "Title", "Tutor", "Students", "Status", "Actions"]}
    data={data}
    onAdd={() => console.log("Add new course")}
  />
);

const EnrollmentsTable = ({ data }) => (
  <CrudTable
    title="Manage Enrollments"
    columns={["ID", "Student", "Course", "Date", "Status", "Actions"]}
    data={data}
    onAdd={() => console.log("Add new enrollment")}
  />
);

const CrudTable = ({ title, columns, data, onAdd }) => (
  <div className="bg-white rounded-xl shadow-sm overflow-hidden">
    <div className="flex justify-between items-center p-4 border-b">
      <h3 className="font-semibold text-lg">{title}</h3>
      <button
        onClick={onAdd}
        className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
      >
        Add New
      </button>
    </div>
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((col) => (
              <th
                key={col}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row) => (
            <tr key={row.id}>
              {Object.values(row).map((val, i) => (
                <td
                  key={i}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                >
                  {val}
                </td>
              ))}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div className="flex space-x-2">
                  <button className="text-indigo-600 hover:text-indigo-900">
                    Edit
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div className="px-4 py-3 bg-gray-50 border-t flex justify-between items-center">
      <div className="text-sm text-gray-500">
        Showing <span className="font-medium">1</span> to{" "}
        <span className="font-medium">10</span> of{" "}
        <span className="font-medium">20</span> results
      </div>
      <div className="flex space-x-2">
        <button className="px-3 py-1 border rounded-md text-sm">
          Previous
        </button>
        <button className="px-3 py-1 border rounded-md text-sm bg-indigo-600 text-white">
          1
        </button>
        <button className="px-3 py-1 border rounded-md text-sm">2</button>
        <button className="px-3 py-1 border rounded-md text-sm">Next</button>
      </div>
    </div>
  </div>
);
