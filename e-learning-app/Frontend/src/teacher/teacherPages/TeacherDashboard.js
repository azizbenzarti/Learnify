import React, { useState } from "react";
import { FaChartLine, FaCommentDots } from "react-icons/fa";
import ToDoList from "../../components/ToDoList";
import ProfileCard from "../../components/ProfileCard";
import Calendar from "../../components/Calendar";
import Leaderboard from "../../components/Leaderboard";
import PerformanceCard from "../../components/PerformanceCard";
import CourseList from "../../components/Course/CourseList";
import Sidebar from "../teacherComponents/SideBar.js";
import Header from "../../components/Header";
import Chatbot from "../../components/Chatbot";

const TeacherDashboard = () => {
 

  const [showAddCourseModal, setShowAddCourseModal] = useState(false);
  const [showManageCourseModal, setShowManageCourseModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const recommendations = [
    "Revise flashcards for CS303",
    "Watch an OS video tutorial",
    "Explore a Coursera course on AI",
    "Attend a Data Analytics session",
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div >
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-50 p-6">
        {/* Header */}
        <div className="bg-white shadow-md p-4 mb-6">
          <Header/>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <ProfileCard />
            <Calendar />
          </div>

          {/* Middle Column */}
          <div className="col-span-2 space-y-6">
            <Leaderboard
              title="Leaderboard"
              icon={<FaChartLine className="mr-2 text-[#E76F51]" />}
              recommendations={recommendations}
            />
            <ToDoList />
            <PerformanceCard />
          </div>
        </div>

        {/* Course List */}
        <CourseList   
        />
      </div>
    </div>
  );
};

export default TeacherDashboard;
