import { FaEdit, FaPlus } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEnrollmentsByStudent } from "../../Redux/Actions/enrollment";
import { useNavigate } from "react-router-dom";
import { getIdFromToken } from "../../utils/auth";

const CourseList = () => {
  const token = localStorage.getItem("jwt");

  const navigate=useNavigate();
  const dispatch = useDispatch();
  const user_id=getIdFromToken(token);
  console.log("user_id",user_id);
  

  // Select courses from Redux store
  const { loading, enrollmentsByStudent = [], error } = useSelector(
    (state) => state.enrollmentReducer
  );
  

  useEffect(() => {
    dispatch(getEnrollmentsByStudent(user_id,token));
  }, [dispatch]);

  

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold">Your Courses</h2>
      <div className="mt-4 space-y-4">
      {enrollmentsByStudent.map(enrollment => (
          <div
            key={enrollment._id}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition"
          >
            <h3 className="text-lg font-bold">{enrollment.course.course.name}</h3>
            <p className="text-gray-600">{enrollment.course.course.description}</p>
           
            <div className="mt-3 flex justify-between">
              <button className="text-blue-600 flex items-center gap-2"onClick={() => navigate(`/course/${enrollment.course.course._id}`)}>
                <FaEdit /> Open
              </button>
             
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default CourseList;
