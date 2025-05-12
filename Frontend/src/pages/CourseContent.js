import React from "react";
import CourseInfo from "../components/Course/CourseInfo";
import ChapterList from "../components/Course/ChapterList";
// import Header from "../components/Header";
import StudentSidebar from "../student/studentComponents/SideBar";
import TeacherSidebar from "../teacher/teacherComponents/SideBar";
import { getRoleFromToken } from "../utils/auth";

export default function CourseContent() {
    const token = localStorage.getItem("jwt");
    const role = getRoleFromToken(token);

    // Select the appropriate sidebar based on role
    const SidebarComponent =
      role === "tutor" ? TeacherSidebar : StudentSidebar;
  return (
    <div className="flex h-screen w-full absolute left-0 top-0">
      <div>
        <SidebarComponent />
      </div>

      <div className="flex-1 ml-50 p-6">
        

        {/* Main content with scrolling */}
        <main className="flex-1 overflow-y-auto focus:outline-none">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
            {/* Course information section */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <CourseInfo />
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 my-6"></div>

            {/* Chapters list with max height and scroll */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Course Chapters
              </h2>
              <div className="max-h-[calc(100vh-300px)] overflow-y-auto">
                <ChapterList />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
