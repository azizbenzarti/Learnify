// src/studentPages/Grades.js
import React from "react";
import Sidebar from "../studentComponents/SideBar";
import Header from "../../components/Header";

const Grades = () => {
  const grades = [
    { course: "CS303 - Operating Systems", grade: "A" },
    { course: "CS325 - Mobile Software Development", grade: "B+" },
    { course: "ISS396 - Junior Project", grade: "A-" },
  ];

  return (
    <div className="flex h-screen w-full absolute left-0 top-0">
      <div>
        <Sidebar />
      
     </div>
      <div className="flex-1 ml-50 p-6">
       
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Your Grades</h1>
      
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-4">Course Grades</h2>
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left">Course</th>
              <th className="py-2 px-4 border-b text-left">Grade</th>
            </tr>
          </thead>
          <tbody>
            {grades.map((grade, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b">{grade.course}</td>
                <td className="py-2 px-4 border-b">{grade.grade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
      </div>
    </div>
  );
};

export default Grades;
