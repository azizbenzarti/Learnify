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
    <div className="flex h-screen w-full absolute left-0 top-0 bg-white">
      {/* Sidebar - Full height with blue background */}
      <div className="  bg-blue-700 h-full "> {/* Fixed width for sidebar */}
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1  overflow-y-auto">
        {/* Header */}
        <div className="bg-white p-4 ">
          <Header />
        </div>

        {/* Dashboard Content */}
        <div className="flex p-6 gap-6 w-full">
          {/* Left Column */}

              <CourseList />
           
      
        

          {/* Right Column */}
          <div className="flex-1 flex flex-col gap-6">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <Calendar />
            </div>
            <div className="bg-white rounded-lg shadow-sm p-4">
              <ToDoList />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default TeacherDashboard;
