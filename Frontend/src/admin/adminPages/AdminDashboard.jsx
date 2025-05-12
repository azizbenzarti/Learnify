import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import adminService from "../../services/adminService";
import Sidebar from "../adminComponents/Sidebar";
import TeachersTable from "../adminComponents/TeachersTable";
import StudentsTable from "../adminComponents/StudentsTable";
import CoursesTable from "../adminComponents/CoursesTable";
import EnrollmentsTable from "../adminComponents/EnrollmentsTable";
// import CrudTable from "../adminComponents/CrudTable";



export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [students, setStudents] = useState([]);
  const [tutors, setTutors] = useState([]);
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [success, setSuccess] = useState(null);

  // Fetch data based on active tab
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        switch (activeTab) {
          case "students":
            const studentsData = await adminService.getallstudents();
            setStudents(studentsData);
            break;
          case "teachers":
            const tutorsData = await adminService.getalltutors();
            setTutors(tutorsData);
            break;
          case "courses":
            const { courses: list } = await adminService.getallcourses();
            setCourses(list);
            // Add your courses API call when available
            // const coursesData = await adminService.getallcourses();
            // setCourses(coursesData);
            break;
          case "enrollments":
            const enrollmentsData = await adminService.getallenrollments();
            setEnrollments(enrollmentsData);
            // Add your enrollments API call when available
            // const enrollmentsData = await adminService.getallenrollments();
            // setEnrollments(enrollmentsData);
            break;
          default:
            // For dashboard, maybe fetch summary stats
            break;
        }
      } catch (err) {
        setError(err.message || "Failed to fetch data");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTab]);

    const handleAcceptTutor = async (tutorId) => {
      try {
        await adminService.acceptTutor(tutorId);
        const updatedTutors = await adminService.getalltutors();
        setTutors(updatedTutors);
      } catch (err) {
        setError(err.message || "Failed to accept tutor");
        console.error("Accept tutor error:", err);
      }
    };

    const handleRejectTutor = async (tutorId) => {
      try {
        await adminService.rejectTutor(tutorId);
        const updatedTutors = await adminService.getalltutors();
        setTutors(updatedTutors);
      } catch (err) {
        setError(err.message || "Failed to reject tutor");
        console.error("Reject tutor error:", err);
      }
  };
  
  const handleDeleteTutor = async (tutorId) => {
    try {
      await adminService.deletebyid(tutorId);
      const updatedTutors = await adminService.getalltutors(tutorId);
      setTutors(updatedTutors);
    }
    catch (err) {
      setError(err.message || "Failed to delete tutor");
      console.error("Delete tutor error:", err);
    }
  };
  
  const handleDeleteStudent = async (studentId) => {
    try {
      await adminService.deletebyid(studentId);
      const updatedStudents = await adminService.getallstudents();
      setStudents(updatedStudents);
    } catch (err) {
      setError(err.message || "Failed to delete student");
      console.error("Delete student error:", err);
    }
  };
  
const handleUpdateStudent = async (studentId, updatedData) => {
  try {
    await adminService.updatebyid(studentId, updatedData);
    const updatedStudents = await adminService.getallstudents();
    setStudents(updatedStudents);
    setError(null);
    setSuccess("Student updated successfully!");
    setTimeout(() => setSuccess(null), 3000);
  } catch (err) {
    setError(err.message || "Failed to update student");
  }
};
    
  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      );
    }

    switch (activeTab) {
      case "students":
        return (
          <StudentsTable
            data={students}
            onDelete={handleDeleteStudent}
            onUpdate={handleUpdateStudent}
          />
        );
      case "teachers":
        return (
          <TeachersTable
            data={tutors}
            onAccept={handleAcceptTutor}
            onReject={handleRejectTutor}
            onDelete={handleDeleteTutor}
          />
        );
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
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
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

