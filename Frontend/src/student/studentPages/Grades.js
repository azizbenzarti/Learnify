import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEnrollmentsByStudent } from "../../Redux/Actions/enrollment";
import { getIdFromToken } from "../../utils/auth";
import { FaGraduationCap, FaChartLine, FaInfoCircle } from "react-icons/fa";
import Sidebar from "../studentComponents/SideBar";
import Header from "../../components/Header";

const Grades = () => {
  const token = localStorage.getItem("jwt");
  const dispatch = useDispatch();
  const user_id = getIdFromToken(token);

  // Fetch grades data from Redux
  const { enrollmentsByStudent = [], loading, error } = useSelector(
    (state) => state.enrollmentReducer
  );

  useEffect(() => {
    dispatch(getEnrollmentsByStudent(user_id, token));
  }, [dispatch, user_id, token]);

  // Filter enrollments with grades
  const gradedCourses = enrollmentsByStudent.filter(
    (enrollment) => enrollment.grade
  );
  const calculateAverageGrade = () => {
  if (gradedCourses.length === 0) return null;
  
  const sum = gradedCourses.reduce((total, enrollment) => 
    total + enrollment.grade, 0);
  return sum / gradedCourses.length;
};
const highestGrade = () => {
  if (gradedCourses.length === 0) return null;
  const maxGrade = Math.max(...gradedCourses.map(enrollment => enrollment.grade));
  return maxGrade;
  
};
  const highestGradeValue = highestGrade();
  const averageGrade = calculateAverageGrade();

  // Grade color mapping
  const getGradeColor = (grade) => {
  if (!grade) return "bg-gray-100 text-gray-800";
  if (grade >= 90 && grade <= 100) return "bg-green-100 text-green-800";  // A range
  if (grade >= 70 && grade < 90) return "bg-blue-100 text-blue-800";     // B range
  if (grade >= 50 && grade < 70) return "bg-yellow-100 text-yellow-800"; // C range
  return "bg-red-100 text-red-800";                                      // D/F range
};

  return (
    <div className="flex h-screen w-full absolute left-0 top-0">
      <div className="bg-blue-700 h-full">
        <Sidebar />
      </div>

      <div className="flex-1 overflow-y-auto mt-8">
        

        <div className="p-6">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <FaGraduationCap className="text-indigo-600 text-3xl mr-3" />
                <h1 className="text-3xl font-bold text-gray-800">Your Grades</h1>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <FaInfoCircle className="mr-2" />
                <span>Current GPA:{parseFloat((averageGrade/25).toFixed(2))}</span>
              </div>
            </div>

            {/* Grades Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-indigo-500">
                <h3 className="text-gray-500 text-sm font-medium">Total Courses</h3>
                <p className="text-3xl font-bold mt-2">{gradedCourses.length}</p>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
                <h3 className="text-gray-500 text-sm font-medium">Highest Grade</h3>
                <p className="text-3xl font-bold mt-2">{highestGradeValue}%</p>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
                <h3 className="text-gray-500 text-sm font-medium">Average Grade</h3>
                <p className="text-3xl font-bold mt-2">{parseFloat(averageGrade.toFixed(2))}%</p>
              </div>
            </div>

            {/* Grades Table */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">Course Grades</h2>
              </div>
              
              {loading ? (
                <div className="p-6 text-center">Loading grades...</div>
              ) : error ? (
                <div className="p-6 text-center text-red-500">Error loading grades</div>
              ) : gradedCourses.length > 0 ? (
                <div className="divide-y divide-gray-200">
                  {gradedCourses.map((enrollment, index) => (
                    <div key={index} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {enrollment.course.course.name}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">
                            {enrollment.course.course.code} • {enrollment.course.passed || "in Progress"}
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getGradeColor(enrollment.grade)}`}>
                          {enrollment.grade || "In Progress"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center">
                  <FaChartLine className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-lg font-medium text-gray-900">No grades available</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Your completed courses with grades will appear here.
                  </p>
                </div>
              )}
            </div>

            {/* Grade Legend */}
            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <div className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                <span>A Range</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
                <span>B Range</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></span>
                <span>C Range</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-red-500 mr-2"></span>
                <span>D/F Range</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Grades;