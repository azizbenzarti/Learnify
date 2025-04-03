import { FaEdit, FaPlus } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listCourses, deleteCourse } from "../../Redux/Actions/course";
import AddCourseForm from "../../teacher/teacherComponents/AddCourseForm";
import { useNavigate } from "react-router-dom";


const CourseList = () => {
  const navigate=useNavigate();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold">Your Courses</h2>
      <div className="mt-4 space-y-4">
        {courses.map((course) => (
          <div
            key={course._id}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition"
          >
            <h3 className="text-lg font-bold">{course.name}</h3>
            <p className="text-gray-600">{course.description}</p>
            <div className="mt-3 flex justify-between">
              <button className="text-blue-600 flex items-center gap-2"onClick={() => navigate(`/course/${course._id}`)}>
                <FaEdit /> Manage
              </button>
              <button
                className="text-red-600"
                onClick={() => handleDelete(course._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-end">
        <button
          className="flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={openModal}
        >
          <FaPlus /> Add Course
        </button>

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative bg-white rounded-lg shadow-lg w-full max-w-3xl p-6">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                onClick={closeModal}
              >
                &times;
              </button>
              <AddCourseForm closeModal={closeModal} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseList;
