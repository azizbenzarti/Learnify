import React, { useState } from "react";
import CourseList from "../studentComponents/CourseList";
import Exams from "../studentComponents/Exams";
import Recommendations from "../studentComponents/Recommendations";
import Chatbot from "../../components/Chatbot";
import ToDoList from "../../components/ToDoList";
import ProfileCard from "../../components/ProfileCard";
import Calendar from "../../components/Calendar";
import Sidebar from "../studentComponents/SideBar";
import Header from "../../components/Header";

import PerformanceCard from "../../components/PerformanceCard";


const StudentDashboard = () => {
  const [showChatbot, setShowChatbot] = useState(false);

  

  const exams = [
    { id: 1, name: "Quiz 1 - Operating Systems", date: "Feb 1, 2025" },
    { id: 2, name: "Graded Lab", date: "Feb 5, 2025" },
  ];

  const recommendations = [
    "Revise flashcards for CS303",
    "Watch an OS video tutorial",
    "Explore a Coursera course on AI",
    "Attend a Data Analytics session",
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div>
        <Sidebar />
      </div>
      <div className="flex-1 ml-50 p-6">
        <div className="bg-white shadow-md p-4 mb-6">
          <Header />
        </div>

        {/* Main Content with Flexbox */}
        <div className="flex">
          <div className="flex-1 mr-4">
          <CourseList />
            <Exams exams={exams} />
            <ToDoList />
          </div>
          <div className="flex-1 ml-4"> 
          <ProfileCard /> 
            <Calendar />
            <PerformanceCard/>
            <Chatbot showChatbot={showChatbot} setShowChatbot={setShowChatbot} />
          
          </div>
          
        </div>
        
        <Recommendations recommendations={recommendations} />
      </div>
    </div>
  );
};

export default StudentDashboard;
