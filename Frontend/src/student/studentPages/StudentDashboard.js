import React, { useState } from "react";
import CourseList from "../studentComponents/CourseList";
import Recommendations from "../studentComponents/Recommendations";
import ToDoList from "../../components/ToDoList";
import Calendar from "../../components/Calendar";
import Sidebar from "../studentComponents/SideBar";
import Header from "../../components/Header";
import Chatbot from "../../components/Chatbot";

const StudentDashboard = () => {
  const [showChatbot, setShowChatbot] = useState(false);

  const recommendations = [
    "Revise flashcards for CS303",
    "Watch an OS video tutorial",
    "Explore a Coursera course on AI",
    "Attend a Data Analytics session",
  ];

  return (
    <div className="flex h-screen w-full absolute left-0 top-0">
      {/* Sidebar - Full height with blue background */}
      <div className="  bg-blue-700 h-full "> {/* Fixed width for sidebar */}
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1  overflow-y-auto">
        {/* Header */}
        <div className="bg-white p-4 shadow-sm mt-8">
          <Header />
        </div>

        {/* Dashboard Content */}
        <div className="flex p-6 gap-6">
          {/* Left Column */}
          <div className="flex-1 flex flex-col gap-6">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <CourseList />
            </div>
            <div className="bg-white rounded-lg shadow-sm p-4">
              <Recommendations recommendations={recommendations} />
            </div>
          </div>

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

      {/* Chatbot */}
      <Chatbot showChatbot={showChatbot} setShowChatbot={setShowChatbot} />
    </div>
  );
};

export default StudentDashboard;