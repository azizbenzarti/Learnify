import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listCourses } from "../../Redux/Actions/course";
import { useNavigate } from "react-router-dom";
import { getIdFromToken } from "../../utils/auth";
import { FaBook, FaChalkboardTeacher, FaCalendarAlt, FaArrowRight } from "react-icons/fa";

const CourseCards = () => {
  const token = localStorage.getItem("jwt");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user_id = getIdFromToken(token);

  // Select courses from Redux store
  const { loading, courses = [], error } = useSelector(
    (state) => state.courseListReducer
  );

  useEffect(() => {
    dispatch(listCourses());
  }, [dispatch]);

  const userCourses = courses.filter(course => course.owner?.trim() === user_id);

  if (loading) return <div className="text-center py-8">Loading courses...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error loading courses</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">My Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
        {userCourses.length > 0 ? (
          userCourses.map((course) => (
            <div 
              key={course._id} 
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{course.name}</h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {course.category || "General"}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-4 line-clamp-3">{course.description}</p>
                
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <FaChalkboardTeacher className="mr-2" />
                  <span>Instructor: You</span>
                </div>
                
                
                
                <button
                  onClick={() => navigate(`/course/${course._id}`)}
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  View Course <FaArrowRight className="ml-2" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <FaBook className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">No courses yet</h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by creating your first course.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseCards;