

// import { FaEdit } from "react-icons/fa";
// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getEnrollmentsByStudent } from "../../Redux/Actions/enrollment";
// import { createStudyRequest, resetStudyRequest } from "../../Redux/Actions/studyRequest";
// import { useNavigate } from "react-router-dom";
// import { getIdFromToken } from "../../utils/auth";

// const CourseList = () => {
//   const token = localStorage.getItem("jwt");
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const user_id = getIdFromToken(token);

//   const {
//     enrollmentsByStudent = [],
//   } = useSelector((state) => state.enrollmentReducer);

//   const {
//     loading: studyLoading,
//     success: studySuccess,
//     error: studyError,
//   } = useSelector((state) => state.createStudyRequestReducer);

//   useEffect(() => {
//     dispatch(getEnrollmentsByStudent(user_id, token));
//   }, [dispatch, user_id, token]);

//   const handleGenerateSchedule = () => {
//     dispatch(createStudyRequest(user_id, token));
//   };
//   console.log("enrollmentsByStudent", enrollmentsByStudent);

//   useEffect(() => {
//     if (studySuccess || studyError) {
//       const timer = setTimeout(() => {
//         dispatch(resetStudyRequest());
//       }, 3000); // Reset after 3 seconds
//       return () => clearTimeout(timer);
//     }
//   }, [studySuccess, studyError, dispatch]);

//   return (
//     <div className="mt-6">
//       <div className="flex justify-between items-center">
//         <h2 className="text-xl font-semibold">Your Courses</h2>
//         <button
//           onClick={handleGenerateSchedule}
//           className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
//           disabled={studyLoading}
//         >
//           {studyLoading ? "Generating..." : "Generate Schedule"}
//         </button>
//       </div>

//       {studyError && (
//         <p className="text-red-500 mt-2">Failed to generate schedule.</p>
//       )}
//       {studySuccess && (
//         <p className="text-green-500 mt-2">Schedule generated successfully!</p>
//       )}

//       <div className="mt-4 space-y-4">
//         {enrollmentsByStudent.map((enrollment) => (
//           <div
//             key={enrollment._id}
//             className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition"
//           >
//             <h3 className="text-lg font-bold">
//               {enrollment.course.course.name}
//             </h3>
//             <p className="text-gray-600">
//               {enrollment.course.course.description}
//             </p>

//             <div className="mt-3 flex justify-between">
//               <button
//                 className="text-blue-600 flex items-center gap-2"
//                 onClick={() =>
//                   navigate(`/course/${enrollment.course.course._id}`)
//                 }
//               >
//                 <FaEdit /> Open
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CourseList;
import { FaEdit } from "react-icons/fa";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEnrollmentsByStudent } from "../../Redux/Actions/enrollment";
import { createStudyRequest, resetStudyRequest } from "../../Redux/Actions/studyRequest";
import { createStudyPlan,resetStudyPlan} from "../../Redux/Actions/studyPlan";
import { useNavigate } from "react-router-dom";
import { getIdFromToken } from "../../utils/auth";

const CourseList = () => {
  const token = localStorage.getItem("jwt");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user_id = getIdFromToken(token);

  const {
    enrollmentsByStudent = [],
  } = useSelector((state) => state.enrollmentReducer);

  const {
    loading: studyLoading,
    success: studySuccess,
    error: studyError,
    data: studyRequestData
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
      console.log('Created study request:', studyRequest);
      // Now create study plan with the returned ID
      if (studyRequest?._id) {
        dispatch(createStudyPlan(studyRequest._id, token));
      }
    } catch (error) {
      
      console.error('Failed to create study request:', error);
    }
  };

  console.log("id",studyRequestData);

  useEffect(() => {
    if (studySuccess && studyRequestData) {
      console.log('Study request created, now creating study plan with ID:', studyRequestData._id);
      dispatch(createStudyPlan(studyRequestData._id, token))
        .then((result) => {
          if (result.error) {
            console.error('Study plan creation failed:', result.error);
          } else {
            console.log('Study plan created successfully');
          }
        });
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
    <div className="mt-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Your Courses</h2>
        <button
          onClick={handleGenerateSchedule}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
          disabled={studyLoading || studyPlanLoading}
        >
          {studyLoading || studyPlanLoading ? "Generating..." : "Generate Schedule"}
        </button>
      </div>

      {/* Status messages */}
      {studyError && (
        <p className="text-red-500 mt-2">Failed to generate schedule: {studyError}</p>
      )}
      {studyPlanError && (
        <p className="text-red-500 mt-2">Failed to create study plan: {studyPlanError}</p>
      )}
      {studySuccess && !studyPlanSuccess && (
        <p className="text-yellow-500 mt-2">Schedule generated, creating study plan...</p>
      )}
      {studySuccess && studyPlanSuccess && (
        <p className="text-green-500 mt-2">Schedule and study plan generated successfully!</p>
      )}

      <div className="mt-4 space-y-4">
        {enrollmentsByStudent.map((enrollment) => (
          <div
            key={enrollment._id}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition"
          >
            <h3 className="text-lg font-bold">
              {enrollment.course.course.name}
            </h3>
            <p className="text-gray-600">
              {enrollment.course.course.description}
            </p>

            <div className="mt-3 flex justify-between">
              <button
                className="text-blue-600 flex items-center gap-2"
                onClick={() =>
                  navigate(`/course/${enrollment.course.course._id}`)
                }
              >
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