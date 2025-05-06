

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCourseDetails } from "../../Redux/Actions/course";
import { getEnrollmentsByCourse, enrollStudent } from "../../Redux/Actions/enrollment";
import profileService from "../../services/profileService";
import { getRoleFromToken } from "../../utils/auth";

export default function CourseInfo() {
  const token = localStorage.getItem("jwt");
  const role = getRoleFromToken(token);
  const dispatch = useDispatch();
  const { courseId } = useParams();
  const { course, loading, error } = useSelector(
    (state) => state.courseDetailsReducer
  );

  const { enrollmentsByCourse = [], loading: enrollLoading } = useSelector(
    (state) => state.enrollmentReducer
  );

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [emails, setEmails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [allStudents, setAllStudents] = useState([]);


  useEffect(() => {
    if (courseId) {
      dispatch(getCourseDetails(courseId));
      dispatch(getEnrollmentsByCourse(courseId, token));
    }
    
    const fetchStudents = async () => {
      try {
        const students = await profileService.getAllStudents();
        console.log("students fetched:", students);  // Should log the array

        setAllStudents(students.students);
      } catch (error) {
        console.error("Failed to fetch students:", error);
      }
    };
    
    fetchStudents();
  }, [dispatch, courseId, token]);

  const handleEnrollStudents = () => {
    setIsModalOpen(true);
  };

  const resetModalState = () => {
    setEmails("");
    setSubmitError(null);
    setSubmitSuccess(false);
    setIsSubmitting(false);
  };

  const closeModal = () => {
    if (!isSubmitting) {
      resetModalState();
      setIsModalOpen(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);
  
    try {
      // Split and clean email input
      const emailList = emails.split(/[\n,]+/).map(email => email.trim()).filter(email => email);
      
      if (emailList.length === 0) {
        throw new Error("Please enter at least one valid email address");
      }
  
      // Email validation regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const invalidEmails = emailList.filter(email => !emailRegex.test(email));
      if (invalidEmails.length > 0) {
        throw new Error(`Invalid email format: ${invalidEmails.join(', ')}`);
      }
  
      // Map emails to student IDs
      const studentsToEnroll = emailList.map(email => {
        const student = allStudents.find(s => s.email === email);
        console.log("student", student); // Log the student object
        if (!student) {
          throw new Error(`Student with email ${email} not found`);
        }
        return { studentId: student._id};
      });
      console.log("studentsToEnroll", studentsToEnroll); // Log the array of student IDs
  
      // Send enrollment requests for each student
      const enrollmentPromises = studentsToEnroll.map(({ studentId }) => {
        return dispatch(enrollStudent(studentId, courseId )); // sending only studentId and courseId
      });
      console.log("enrollmentPromises", enrollmentPromises);
  
      // Wait for all enrollments to complete
      await Promise.all(enrollmentPromises);
      
      setSubmitSuccess(true);
      setEmails(""); // Reset email input
  
      // Refresh enrollments list after successful enrollment
      dispatch(getEnrollmentsByCourse(courseId, token));
  
      // Reset modal after a delay
      setTimeout(() => {
        resetModalState();
        setIsModalOpen(false);
      }, 2000);
  
    } catch (error) {
      setSubmitError(error.message || "Failed to enroll students");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (loading || enrollLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!course || Object.keys(course).length === 0) {
    return <div>No course data found.</div>;
  }


  console.log(allStudents, "all students data");
 
  return (
    <div className="space-y-3">
      <div>
        <h1 className="text-2xl font-medium uppercase mb-4">
          {course.name}
        </h1>
        <p className="text-gray-400 mb-6">
          {course.description}
        </p>
        <ul className="flex gap-4 mb-6">
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
          <li>
            {enrollmentsByCourse.length} Enrolled
          </li>
        </ul>
        <ul className="sm:flex items-center text-sm text-gray-500">
          <span className="hidden sm:inline mx-3 text-2xl">·</span>
          <li>Last updated {course.updated_at}</li>
        </ul>
      </div>
      {role==="tutor" && (
      <button 
        onClick={handleEnrollStudents}
        className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md transition duration-300"
      >
        Enroll Students
      </button>
      )}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Enroll Students</h3>
                <button 
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-500"
                  disabled={isSubmitting}
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="emails" className="block text-sm font-medium text-gray-700 mb-1">
                    Student Emails
                  </label>
                  <textarea
                    id="emails"
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Enter email addresses, separated by commas or new lines"
                    value={emails}
                    onChange={(e) => setEmails(e.target.value)}
                    required
                    disabled={isSubmitting}
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    You can enter multiple email addresses separated by commas or new lines.
                  </p>
                </div>

                {submitError && (
                  <div className="mb-4 text-sm text-red-600">
                    {submitError}
                  </div>
                )}

                {submitSuccess && (
                  <div className="mb-4 text-sm text-green-600">
                    Students enrolled successfully!
                  </div>
                )}

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Enrolling...
                      </>
                    ) : "Enroll Students"}
                  </button>
                </div>
              </form>
            </div>
                 
          </div>
        </div>
      
      )}
    </div>
  );
}