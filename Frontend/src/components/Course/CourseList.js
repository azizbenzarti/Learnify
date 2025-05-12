// import { FaEdit, FaPlus } from "react-icons/fa";
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { listCourses, deleteCourse } from "../../Redux/Actions/course";
// import AddCourseForm from "../../teacher/teacherComponents/AddCourseForm";
// import { useNavigate } from "react-router-dom";
// import { getIdFromToken } from "../../utils/auth";

// const CourseList = () => {
//   const token = localStorage.getItem("jwt");

//   const navigate=useNavigate();
//   const dispatch = useDispatch();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const user_id=getIdFromToken(token);
//   console.log(user_id);
  

//   // Select courses from Redux store
//   const { loading, courses = [], error } = useSelector(
//     (state) => state.courseListReducer
//   );
//   const { success: deleteSuccess, error: deleteError } = useSelector(
//     (state) => state.courseDeleteReducer
//   );

//   useEffect(() => {
//     dispatch(listCourses());
//   }, [dispatch, deleteSuccess]);

//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure you want to delete this course?")) {
//       dispatch(deleteCourse(id));
//       dispatch(listCourses());
//     }
//   };

//   const openModal = () => {
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   return (
//     <div className="mt-6">
//       <h2 className="text-xl font-semibold">Your Courses</h2>
//       <div className="mt-4 space-y-4">
//       {courses
//         .filter(course => course.owner.trim()=== user_id) 
//         .map(course => (
//           <div
//             key={course._id}
//             className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition"
//           >
//             <h3 className="text-lg font-bold">{course.name}</h3>
//             <p className="text-gray-600">{course.description}</p>
//             <div className="mt-3 flex justify-between">
//               <button className="text-blue-600 flex items-center gap-2"onClick={() => navigate(`/course/${course._id}`)}>
//                 <FaEdit /> Manage
//               </button>
//               <button
//                 className="text-red-600"
//                 onClick={() => handleDelete(course._id)}
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className="mt-6 flex justify-end">
//         <button
//           className="flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//           onClick={openModal}
//         >
//           <FaPlus /> Add Course
//         </button>

//         {isModalOpen && (
//           <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//             <div className="relative bg-white rounded-lg shadow-lg w-full max-w-3xl p-6">
//               <button
//                 className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
//                 onClick={closeModal}
//               >
//                 &times;
//               </button>
//               <AddCourseForm closeModal={closeModal} />
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CourseList;
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listCourses, deleteCourse } from "../../Redux/Actions/course";
import AddCourseForm from "../../teacher/teacherComponents/AddCourseForm";
import { useNavigate } from "react-router-dom";
import { getIdFromToken } from "../../utils/auth";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";

const CourseList = () => {
  const token = localStorage.getItem("jwt");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user_id = getIdFromToken(token);

  // Select courses from Redux store
  const { loading, courses = [], error } = useSelector(
    (state) => state.courseListReducer
  );
  const { success: deleteSuccess, error: deleteError } = useSelector(
    (state) => state.courseDeleteReducer
  );

  useEffect(() => {
    dispatch(listCourses());
  }, [dispatch, deleteSuccess]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      dispatch(deleteCourse(id));
      dispatch(listCourses());
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const userCourses = courses.filter(course => course.owner?.trim() === user_id);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Main Card Container */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        {/* Card Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-lg font-semibold">My Courses</h3>
          <div className="flex items-center gap-4">
            <button
              className="flex items-center gap-2 rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              onClick={openModal}
            >
              <FaPlus size={12} /> Add Course
            </button>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-6">
          <div className="space-y-4">
            {userCourses.length > 0 ? (
              userCourses.map((course) => (
                // Course Card
                <div key={course._id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-lg">{course.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{course.description}</p>
                      {course.category && (
                        <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {course.category}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-3">
                      <button
                        className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-800 px-3 py-1.5 rounded hover:bg-blue-50"
                        onClick={() => navigate(`/course/${course._id}`)}
                      >
                        <FaEdit size={14} /> Manage
                      </button>
                      <button
                        className="flex items-center gap-1.5 text-sm text-red-600 hover:text-red-800 px-3 py-1.5 rounded hover:bg-red-50"
                        onClick={() => handleDelete(course._id)}
                      >
                        <FaTrash size={14} /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500 border rounded-lg">
                You don't have any courses yet. Click "Add Course" to create one.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Course Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="relative bg-white rounded-lg shadow-lg w-full max-w-3xl p-6 mx-4">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
              onClick={closeModal}
            >
              &times;
            </button>
            <AddCourseForm closeModal={closeModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseList;