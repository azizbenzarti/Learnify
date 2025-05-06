import {
    CREATE_STUDY_REQUEST_REQUEST,
    CREATE_STUDY_REQUEST_SUCCESS,
    CREATE_STUDY_REQUEST_FAIL,
    CREATE_STUDY_REQUEST_RESET,
  } from '../Constants/studyRequest';
  const initialState = {
    loading: false,
    success: false,
    error: null,
  };
  
  export const createStudyRequestReducer = (state = {}, action) => {
    switch (action.type) {
      case CREATE_STUDY_REQUEST_REQUEST:
        return { loading: true };
      case CREATE_STUDY_REQUEST_SUCCESS:
        return { loading: false, success: true,  data: action.payload };
      case CREATE_STUDY_REQUEST_FAIL:
        return { loading: false, error: action.payload };
        case CREATE_STUDY_REQUEST_RESET:
      return { ...initialState };
      default:
        return state;
    }
  };
  