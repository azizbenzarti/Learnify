import { FaEdit, FaCalendarAlt } from "react-icons/fa";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEnrollmentsByStudent } from "../../Redux/Actions/enrollment";
import { createStudyRequest, resetStudyRequest } from "../../Redux/Actions/studyRequest";
import { createStudyPlan, resetStudyPlan } from "../../Redux/Actions/studyPlan";
import { useNavigate } from "react-router-dom";
import { getIdFromToken } from "../../utils/auth";

const StudentCourses = () => {
  const token = localStorage.getItem("jwt");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user_id = getIdFromToken(token);

  const { enrollmentsByStudent = [] } = useSelector(
    (state) => state.enrollmentReducer
  );

  const {
    loading: studyLoading,
    success: studySuccess,
    error: studyError,
    data: studyRequestData,
  } = useSelector((state) => state.createStudyRequestReducer);

  const {
    loading: studyPlanLoading,
    success: studyPlanSuccess,
    error: studyPlanError,
  } = useSelector((state) => state.createStudyPlanReducer);

  useEffect(() => {
    dispatch(getEnrollmentsByStudent(user_id, token));
  }, [dispatch, user_id, token]);

  const handleGenerateSchedule = async () => {
    try {
      const studyRequest = await dispatch(createStudyRequest(user_id, token));
      if (studyRequest?._id) {
        dispatch(createStudyPlan(studyRequest._id, token));
      }
    } catch (error) {
      console.error("Failed to create study request:", error);
    }
  };

  useEffect(() => {
    if (studySuccess && studyRequestData) {
      dispatch(createStudyPlan(studyRequestData._id, token));
    }
  }, [studySuccess, studyRequestData, dispatch, token]);

  useEffect(() => {
    if (studySuccess || studyError || studyPlanSuccess || studyPlanError) {
      const timer = setTimeout(() => {
        dispatch(resetStudyRequest());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [studySuccess, studyError, studyPlanSuccess, studyPlanError, dispatch]);

  return (
    <div className="w-full">
      {/* Header with Generate Schedule Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Courses</h1>
        <button
          onClick={handleGenerateSchedule}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
          disabled={studyLoading || studyPlanLoading}
        >
          <FaCalendarAlt />
          {studyLoading || studyPlanLoading ? "Generating..." : "Generate Schedule"}
        </button>
      </div>

      {/* Status Messages */}
      {studyError && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4">
          Failed to generate schedule: {studyError}
        </div>
      )}
      {studyPlanError && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4">
          Failed to create study plan: {studyPlanError}
        </div>
      )}
      {studySuccess && !studyPlanSuccess && (
        <div className="bg-yellow-50 text-yellow-600 p-3 rounded-md mb-4">
          Schedule generated, creating study plan...
        </div>
      )}
      {studySuccess && studyPlanSuccess && (
        <div className="bg-green-50 text-green-600 p-3 rounded-md mb-4">
          Schedule and study plan generated successfully!
        </div>
      )}

      {/* Courses Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {enrollmentsByStudent.length > 0 ? (
          enrollmentsByStudent.map((enrollment) => (
            <div 
              key={enrollment._id}
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="p-5">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      {enrollment.course.course.name}
                    </h3>
                    
                  </div>
                  <button 
                    onClick={() => navigate(`/course/${enrollment.course.course._id}`)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                   
                  </button>
                </div>
                
                <p className="text-gray-600 text-sm mb-5 line-clamp-3">
                  {enrollment.course.course.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {enrollment.course.course.category || "in progress"}
                  </span>
                  <button 
                    onClick={() => navigate(`/course/${enrollment.course.course._id}`)}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    View Details →
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12 border-2 border-dashed rounded-lg">
            <p className="text-gray-500">You are not enrolled in any courses yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentCourses;