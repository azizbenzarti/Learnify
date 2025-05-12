import { useState } from "react";
import Sidebar from "../teacherComponents/SideBar.js";
import CourseCards from "../teacherComponents/TeacherCourses.js";

const TeacherCourses = () => {
  return (
     <div className="flex h-screen w-full absolute left-0 top-0">
    
      <div >
        <Sidebar />
      </div>
      <div className="flex-1 p-6 bg-white-100 w-full ">
        <CourseCards />
      </div>
    </div>
  );
};

export default TeacherCourses;