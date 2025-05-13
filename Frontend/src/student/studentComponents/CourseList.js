// // import { FaEdit } from "react-icons/fa";
// // import React, { useEffect } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { getEnrollmentsByStudent } from "../../Redux/Actions/enrollment";
// // import { createStudyRequest, resetStudyRequest } from "../../Redux/Actions/studyRequest";
// // import { useNavigate } from "react-router-dom";
// // import { getIdFromToken } from "../../utils/auth";

// // const CourseList = () => {
// //   const token = localStorage.getItem("jwt");
// //   const navigate = useNavigate();
// //   const dispatch = useDispatch();
// //   const user_id = getIdFromToken(token);

// //   const {
// //     enrollmentsByStudent = [],
// //   } = useSelector((state) => state.enrollmentReducer);

// //   const {
// //     loading: studyLoading,
// //     success: studySuccess,
// //     error: studyError,
// //   } = useSelector((state) => state.createStudyRequestReducer);

// //   useEffect(() => {
// //     dispatch(getEnrollmentsByStudent(user_id, token));
// //   }, [dispatch, user_id, token]);

// //   const handleGenerateSchedule = () => {
// //     dispatch(createStudyRequest(user_id, token));
// //   };
// //   console.log("enrollmentsByStudent", enrollmentsByStudent);

// //   useEffect(() => {
// //     if (studySuccess || studyError) {
// //       const timer = setTimeout(() => {
// //         dispatch(resetStudyRequest());
// //       }, 3000); // Reset after 3 seconds
// //       return () => clearTimeout(timer);
// //     }
// //   }, [studySuccess, studyError, dispatch]);

// //   return (
// //     <div className="mt-6">
// //       <div className="flex justify-between items-center">
// //         <h2 className="text-xl font-semibold">Your Courses</h2>
// //         <button
// //           onClick={handleGenerateSchedule}
// //           className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
// //           disabled={studyLoading}
// //         >
// //           {studyLoading ? "Generating..." : "Generate Schedule"}
// //         </button>
// //       </div>

// //       {studyError && (
// //         <p className="text-red-500 mt-2">Failed to generate schedule.</p>
// //       )}
// //       {studySuccess && (
// //         <p className="text-green-500 mt-2">Schedule generated successfully!</p>
// //       )}

// //       <div className="mt-4 space-y-4">
// //         {enrollmentsByStudent.map((enrollment) => (
// //           <div
// //             key={enrollment._id}
// //             className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition"
// //           >
// //             <h3 className="text-lg font-bold">
// //               {enrollment.course.course.name}
// //             </h3>
// //             <p className="text-gray-600">
// //               {enrollment.course.course.description}
// //             </p>

// //             <div className="mt-3 flex justify-between">
// //               <button
// //                 className="text-blue-600 flex items-center gap-2"
// //                 onClick={() =>
// //                   navigate(`/course/${enrollment.course.course._id}`)
// //                 }
// //               >
// //                 <FaEdit /> Open
// //               </button>
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default CourseList;
// // import { FaEdit } from "react-icons/fa";
// // import React, { useEffect } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { getEnrollmentsByStudent } from "../../Redux/Actions/enrollment";
// // import {
// //   createStudyRequest,
// //   resetStudyRequest,
// // } from "../../Redux/Actions/studyRequest";
// // import { createStudyPlan, resetStudyPlan } from "../../Redux/Actions/studyPlan";
// // import { useNavigate } from "react-router-dom";
// // import { getIdFromToken } from "../../utils/auth";

// // const CourseList = () => {
// //   const token = localStorage.getItem("jwt");
// //   const navigate = useNavigate();
// //   const dispatch = useDispatch();
// //   const user_id = getIdFromToken(token);

// //   const { enrollmentsByStudent = [] } = useSelector(
// //     (state) => state.enrollmentReducer
// //   );

// //   const {
// //     loading: studyLoading,
// //     success: studySuccess,
// //     error: studyError,
// //     data: studyRequestData,
// //   } = useSelector((state) => state.createStudyRequestReducer);

// //   const {
// //     loading: studyPlanLoading,
// //     success: studyPlanSuccess,
// //     error: studyPlanError,
// //   } = useSelector((state) => state.createStudyPlanReducer);

// //   useEffect(() => {
// //     dispatch(getEnrollmentsByStudent(user_id, token));
// //   }, [dispatch, user_id, token]);

// //   const handleGenerateSchedule = async () => {
// //     try {
// //       const studyRequest = await dispatch(createStudyRequest(user_id, token));
// //       console.log("Created study request:", studyRequest);
// //       // Now create study plan with the returned ID
// //       if (studyRequest?._id) {
// //         dispatch(createStudyPlan(studyRequest._id, token));
// //       }
// //     } catch (error) {
// //       console.error("Failed to create study request:", error);
// //     }
// //   };

// //   console.log("id", studyRequestData);

// //   useEffect(() => {
// //     if (studySuccess && studyRequestData) {
// //       console.log(
// //         "Study request created, now creating study plan with ID:",
// //         studyRequestData._id
// //       );
// //       dispatch(createStudyPlan(studyRequestData._id, token)).then((result) => {
// //         if (result.error) {
// //           console.error("Study plan creation failed:", result.error);
// //         } else {
// //           console.log("Study plan created successfully");
// //         }
// //       });
// //     }
// //   }, [studySuccess, studyRequestData, dispatch, token]);

// //   useEffect(() => {
// //     if (studySuccess || studyError || studyPlanSuccess || studyPlanError) {
// //       const timer = setTimeout(() => {
// //         dispatch(resetStudyRequest());
// //       }, 3000);
// //       return () => clearTimeout(timer);
// //     }
// //   }, [studySuccess, studyError, studyPlanSuccess, studyPlanError, dispatch]);

// //   return (
// //     <div className="mt-6">
// //       <div className="flex justify-between items-center">
// //         <h2 className="text-xl font-semibold">Your Courses</h2>
// //         <button
// //           onClick={handleGenerateSchedule}
// //           className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
// //           disabled={studyLoading || studyPlanLoading}
// //         >
// //           {studyLoading || studyPlanLoading
// //             ? "Generating..."
// //             : "Generate Schedule"}
// //         </button>
// //       </div>

// //       {/* Status messages */}
// //       {studyError && (
// //         <p className="text-red-500 mt-2">
// //           Failed to generate schedule: {studyError}
// //         </p>
// //       )}
// //       {studyPlanError && (
// //         <p className="text-red-500 mt-2">
// //           Failed to create study plan: {studyPlanError}
// //         </p>
// //       )}
// //       {studySuccess && !studyPlanSuccess && (
// //         <p className="text-yellow-500 mt-2">
// //           Schedule generated, creating study plan...
// //         </p>
// //       )}
// //       {studySuccess && studyPlanSuccess && (
// //         <p className="text-green-500 mt-2">
// //           Schedule and study plan generated successfully!
// //         </p>
// //       )}

// //       <div className="mt-4 space-y-4">
// //         {enrollmentsByStudent.map((enrollment) => (
// //           <div
// //             key={enrollment._id}
// //             className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition"
// //           >
// //             <h3 className="text-lg font-bold">
// //               {enrollment.course.course.name}
// //             </h3>
// //             <p className="text-gray-600">
// //               {enrollment.course.course.description}
// //             </p>

// //             <div className="mt-3 flex justify-between">
// //               <button
// //                 className="text-blue-600 flex items-center gap-2"
// //                 onClick={() =>
// //                   navigate(`/course/${enrollment.course.course._id}`)
// //                 }
// //               >
// //                 <FaEdit /> Open
// //               </button>
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default CourseList;
// import { FaEdit, FaCalendarAlt } from "react-icons/fa";
// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getEnrollmentsByStudent } from "../../Redux/Actions/enrollment";
// import {
//   createStudyRequest,
//   resetStudyRequest,
// } from "../../Redux/Actions/studyRequest";
// import { createStudyPlan, resetStudyPlan } from "../../Redux/Actions/studyPlan";
// import { useNavigate } from "react-router-dom";
// import { getIdFromToken } from "../../utils/auth";

// const CourseList = () => {
//   const token = localStorage.getItem("jwt");
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const user_id = getIdFromToken(token);

//   const { enrollmentsByStudent = [] } = useSelector(
//     (state) => state.enrollmentReducer
//   );

//   const {
//     loading: studyLoading,
//     success: studySuccess,
//     error: studyError,
//     data: studyRequestData,
//   } = useSelector((state) => state.createStudyRequestReducer);

//   const {
//     loading: studyPlanLoading,
//     success: studyPlanSuccess,
//     error: studyPlanError,
//   } = useSelector((state) => state.createStudyPlanReducer);

//   useEffect(() => {
//     dispatch(getEnrollmentsByStudent(user_id, token));
//   }, [dispatch, user_id, token]);

//   const handleGenerateSchedule = async () => {
//     try {
//       const studyRequest = await dispatch(createStudyRequest(user_id, token));
//       if (studyRequest?._id) {
//         dispatch(createStudyPlan(studyRequest._id, token));
//       }
//     } catch (error) {
//       console.error("Failed to create study request:", error);
//     }
//   };

//   useEffect(() => {
//     if (studySuccess && studyRequestData) {
//       dispatch(createStudyPlan(studyRequestData._id, token));
//     }
//   }, [studySuccess, studyRequestData, dispatch, token]);

//   useEffect(() => {
//     if (studySuccess || studyError || studyPlanSuccess || studyPlanError) {
//       const timer = setTimeout(() => {
//         dispatch(resetStudyRequest());
//       }, 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [studySuccess, studyError, studyPlanSuccess, studyPlanError, dispatch]);

//   return (
//     <div className="max-w-full mx-auto">
//       {/* Main Card Container */}
//       <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
//         {/* Card Header */}
//         <div className="px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//           <h2 className="text-xl font-semibold">My Courses</h2>
//           <button
//             onClick={handleGenerateSchedule}
//             className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
//             disabled={studyLoading || studyPlanLoading}
//           >
//             <FaCalendarAlt />
//             {studyLoading || studyPlanLoading
//               ? "Generating Schedule..."
//               : "Generate Schedule"}
//           </button>
//         </div>

//         {/* Status Messages */}
//         <div className="px-6 pt-2 pb-0">
//           {studyError && (
//             <p className="text-red-500 text-sm py-2">
//               Failed to generate schedule: {studyError}
//             </p>
//           )}
//           {studyPlanError && (
//             <p className="text-red-500 text-sm py-2">
//               Failed to create study plan: {studyPlanError}
//             </p>
//           )}
//           {studySuccess && !studyPlanSuccess && (
//             <p className="text-yellow-600 text-sm py-2">
//               Schedule generated, creating study plan...
//             </p>
//           )}
//           {studySuccess && studyPlanSuccess && (
//             <p className="text-green-600 text-sm py-2">
//               Schedule and study plan generated successfully!
//             </p>
//           )}
//         </div>

//         {/* Card Content */}
//         <div className="p-6">
//           {enrollmentsByStudent.length > 0 ? (
//             <div className="grid gap-4">
//               {enrollmentsByStudent.map((enrollment) => (
//                 <div
//                   key={enrollment._id}
//                   className="border rounded-lg p-4 hover:shadow-md transition-shadow"
//                 >
//                   <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//                     <div>
//                       <h3 className="font-semibold text-lg">
//                         {enrollment.course.course.name}
//                       </h3>
//                       <p className="text-sm text-gray-600 mt-1">
//                         {enrollment.course.course.description}
//                       </p>
//                       {enrollment.course.course.category && (
//                         <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
//                           {enrollment.course.course.category}
//                         </span>
//                       )}
//                     </div>
//                     <button
//                       className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-800 px-3 py-1.5 rounded hover:bg-blue-50 self-start md:self-auto"
//                       onClick={() =>
//                         navigate(`/course/${enrollment.course.course._id}`)
//                       }
//                     >
//                       <FaEdit size={14} /> Open Course
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="text-center py-8 text-gray-500 border rounded-lg">
//               You are not enrolled in any courses yet.
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CourseList;
import { FaEdit, FaListAlt } from "react-icons/fa";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEnrollmentsByStudent } from "../../Redux/Actions/enrollment";
import { useNavigate } from "react-router-dom";
import { getIdFromToken } from "../../utils/auth";

const CourseList = () => {
  const token = localStorage.getItem("jwt");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user_id = getIdFromToken(token);

  const { enrollmentsByStudent = [] } = useSelector(
    (state) => state.enrollmentReducer
  );

  useEffect(() => {
    dispatch(getEnrollmentsByStudent(user_id, token));
  }, [dispatch, user_id, token]);

  const handleViewAllCourses = () => {
    navigate('/student-courses');
  };

  return (
    <div className="max-w-full mx-auto">
      {/* Main Card Container */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        {/* Card Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-xl font-semibold">My Courses</h2>
          <a href="/courses" className="text-sm text-blue-600 hover:underline"> View All</a>
        </div>

        {/* Card Content */}
        <div className="p-6">
          {enrollmentsByStudent.length > 0 ? (
            <div className="grid gap-4">
              {enrollmentsByStudent.map((enrollment) => (
                <div
                  key={enrollment._id}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-lg">
                        {enrollment.course.course.name}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {enrollment.course.course.description}
                      </p>
                      {enrollment.course.course.category && (
                        <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {enrollment.course.course.category}
                        </span>
                      )}
                    </div>
                    <button
                      className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-800 px-3 py-1.5 rounded hover:bg-blue-50 self-start md:self-auto"
                      onClick={() =>
                        navigate(`/course/${enrollment.course.course._id}`)
                      }
                    >
                      <FaEdit size={14} /> Open Course
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500 border rounded-lg">
              You are not enrolled in any courses yet.
              <button 
                onClick={handleViewAllCourses}
                className="mt-4 flex items-center justify-center gap-2 mx-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <FaListAlt />
                Browse Available Courses
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseList;