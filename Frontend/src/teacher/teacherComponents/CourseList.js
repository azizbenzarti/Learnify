import React from "react";
import { FaEdit, FaPlus } from "react-icons/fa";

const CourseList = ({ courses, setSelectedCourse, setShowManageCourseModal, setShowAddCourseModal }) => {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold">Your Courses</h2>
      <div className="mt-4 space-y-4">
        {courses.map((course) => (
          <div key={course.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
            <h3 className="text-lg font-bold">{course.name}</h3>
            <p className="text-gray-600">{course.description}</p>
            <div className="mt-3 flex justify-between">
              <button onClick={() => {
                setSelectedCourse(course);
                setShowManageCourseModal(true);
              }} className="text-blue-600 flex items-center gap-2">
                <FaEdit /> Manage
              </button>
              <button className="text-red-600">Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-end">
        <button onClick={() => setShowAddCourseModal(true)}
          className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 flex items-center gap-2">
          <FaPlus /> Add Course
        </button>
      </div>
    </div>
  );
};

export default CourseList;
