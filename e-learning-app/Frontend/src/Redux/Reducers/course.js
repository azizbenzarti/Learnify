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
  
  
export const courseCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case "COURSE_CREATE_REQUEST":
      return { loading: true };
    case "COURSE_CREATE_SUCCESS":
      return { loading: false, success: true };
    case "COURSE_CREATE_FAIL":
      return { loading: false, error: action.payload };
    case "COURSE_CREATE_RESET":
      return {}; // Reset the state
    default:
      return state;
  }
};
  
  // ✅ List Courses Reducer
  export const courseListReducer = (state = { courses: [] }, action) => {
    switch (action.type) {
      case COURSE_LIST_REQUEST:
        return { ...state, loading: true };
      case COURSE_LIST_SUCCESS:
        return { ...state, loading: false, courses: action.payload };
      case COURSE_LIST_FAIL:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  // ✅ Get Course Details Reducer
  export const courseDetailsReducer = (state = { course: {} }, action) => {
    switch (action.type) {
      case COURSE_DETAILS_REQUEST:
        return { loading: true, ...state };
      case COURSE_DETAILS_SUCCESS:
        return { loading: false, course: action.payload };
      case COURSE_DETAILS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  // ✅ Delete Course Reducer
  export const courseDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case COURSE_DELETE_REQUEST:
        return { loading: true };
      case COURSE_DELETE_SUCCESS:
        return { loading: false, success: true };
      case COURSE_DELETE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  