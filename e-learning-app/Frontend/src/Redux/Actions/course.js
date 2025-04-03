import axios from "axios";
import {
  COURSE_CREATE_REQUEST,
  COURSE_CREATE_SUCCESS,
  COURSE_CREATE_FAIL,
  COURSE_LIST_REQUEST,
  COURSE_LIST_SUCCESS,
  COURSE_LIST_FAIL,
  COURSE_DETAILS_REQUEST,
  COURSE_DETAILS_SUCCESS,
  COURSE_DETAILS_FAIL,
  COURSE_DELETE_REQUEST,
  COURSE_DELETE_SUCCESS,
  COURSE_DELETE_FAIL,
} from "../Constants/course";

import { BASE_URL } from "../Constants/BASE_URL";

// ✅ Create Course
export const createCourse = (name,description) => async (dispatch) => {
  try {
    dispatch({ type: COURSE_CREATE_REQUEST });

    const { data } = await axios.post(`${BASE_URL}/course`, {name,description});

    dispatch({ type: COURSE_CREATE_SUCCESS, payload: data.course });
  } catch (error) {
    dispatch({
      type: COURSE_CREATE_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// ✅ Fetch All Courses
export const listCourses = () => async (dispatch) => {
  try {
    dispatch({ type: COURSE_LIST_REQUEST });

    const { data } = await axios.get(`${BASE_URL}/course`);
    console.log(data.courses);

    dispatch({ type: COURSE_LIST_SUCCESS, payload: data.courses });
    console.log("hi" ,data.courses);

  } catch (error) {
    dispatch({
      type: COURSE_LIST_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// ✅ Get Course Details
export const getCourseDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: COURSE_DETAILS_REQUEST });
    console.log("Fetching course details for ID:", id);

    const { data } = await axios.get(`${BASE_URL}/course/${id}`);
    console.log("API Response:", data);

    dispatch({ type: COURSE_DETAILS_SUCCESS, payload: data.course });
  } catch (error) {
    console.error("Error fetching course details:", error);
    dispatch({
      type: COURSE_DETAILS_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// ✅ Delete Course
export const deleteCourse = (id) => async (dispatch) => {
  try {
    dispatch({ type: COURSE_DELETE_REQUEST });

    await axios.delete(`${BASE_URL}/course/${id}`);

    dispatch({ type: COURSE_DELETE_SUCCESS, payload: id });
  } catch (error) {
    dispatch({
      type: COURSE_DELETE_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};
export const resetCourseCreate = () => (dispatch) => {
  dispatch({ type: "COURSE_CREATE_RESET" });
};
