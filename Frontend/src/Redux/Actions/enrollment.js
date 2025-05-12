import * as types from '../Constants/enrollment';
import api from '../../api/enrollmentApi'; 

// Enroll a student in a course
export const enrollStudent = (studentId, courseId) => async (dispatch) => {
  try {
    dispatch({ type: types.ENROLLMENT_REQUEST });
    
    const response = await api.enrollStudent(studentId, courseId);
    
    dispatch({
      type: types.ENROLLMENT_SUCCESS,
      payload: response.data
    });
    
    return response;
  } catch (error) {
    dispatch({
      type: types.ENROLLMENT_FAILURE,
      payload: error.response?.data?.message || error.message
    });
    throw error;
  }
};

// Get enrollments by student
export const getEnrollmentsByStudent = (studentId, token) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_ENROLLMENTS_BY_STUDENT_REQUEST });
    
    const {data} = await api.getEnrollmentsByStudent(studentId, token);
    
    dispatch({
      type: types.GET_ENROLLMENTS_BY_STUDENT_SUCCESS,
      payload: data.enrollments
    });
    
    return data.enrollments;
  } catch (error) {
    dispatch({
      type: types.GET_ENROLLMENTS_BY_STUDENT_FAILURE,
      payload: error.response?.data?.message || error.message
    });
    throw error;
  }
};

// Get enrollments by course
export const getEnrollmentsByCourse = (courseId, token) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_ENROLLMENTS_BY_COURSE_REQUEST });

    const { data } = await api.getEnrollmentsByCourse(courseId, token);

    dispatch({
      type: types.GET_ENROLLMENTS_BY_COURSE_SUCCESS,
      payload: data.enrollments,
    });

    return data.enrollments;
  } catch (error) {
    dispatch({
      type: types.GET_ENROLLMENTS_BY_COURSE_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
    throw error;
  }
};