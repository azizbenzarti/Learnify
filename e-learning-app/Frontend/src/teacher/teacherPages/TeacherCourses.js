import { useState } from "react";
import Sidebar from "../teacherComponents/SideBar.js";
import CourseList from "../../components/Course/CourseList";

const TeacherCourses = () => {
  return (
    <div className="flex min-h-screen">
    
      <div className="w-64 bg-gray-800 text-white">
        <Sidebar />
      </div>
      <div className="flex-1 p-6 bg-gray-100">
        <CourseList />
      </div>
    </div>
  );
};

export default TeacherCourses;