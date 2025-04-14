import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCourseDetails } from "../../Redux/Actions/course";

export default function CourseInfo() {
  const dispatch = useDispatch();
  const { courseId } = useParams();
  const { course, loading, error } = useSelector(
    (state) => state.courseDetailsReducer
  );

  useEffect(() => {
    console.log("useEffect triggered with courseId:", courseId);
    if (courseId) {
      dispatch(getCourseDetails(courseId));
    }
  }, [dispatch, courseId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!course || Object.keys(course).length === 0) {
    return <div>No course data found.</div>;
  }

  return (
    <div className="space-y-3"> {/* Increased vertical spacing */}
      <div>
        <h1 className="text-2xl font-medium uppercase mb-4"> {/* Added margin-bottom */}
          {course.name}
        </h1>
        <p className="text-gray-400 mb-6"> {/* Added margin-bottom */}
          {course.description}
        </p>
        <ul className="flex gap-4 mb-6"> {/* Added margin-bottom */}
          <li className="flex items-center">
            <span className="mr-1.5 rounded bg-gray-900 px-2 text-sm font-semibold text-white">
              4.9
            </span>
            <div className="flex items-center justify-center">
              {[...Array(4)].map((_, index) => (
                <svg
                  key={index}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5 text-purple-500"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              ))}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5 text-gray-400"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            </div>
          </li>
          <li className="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2 w-4 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            245 Enrolled
          </li>
        </ul>
        <ul className="sm:flex items-center text-sm text-gray-500">
          <span className="hidden sm:inline mx-3 text-2xl">·</span>
          <li>Last updated {course.updated_at}</li>
        </ul>
      </div>
     

    </div>
  );
}