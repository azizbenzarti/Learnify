import {
    CONTENT_UPLOAD_REQUEST,
    CONTENT_UPLOAD_SUCCESS,
    CONTENT_UPLOAD_FAIL,
    CONTENT_FETCH_ALL_REQUEST,
    CONTENT_FETCH_ALL_SUCCESS,
    CONTENT_FETCH_ALL_FAIL,
    CONTENT_FETCH_BY_ID_REQUEST,
    CONTENT_FETCH_BY_ID_SUCCESS,
    CONTENT_FETCH_BY_ID_FAIL,
    CONTENT_DELETE_REQUEST,
    CONTENT_DELETE_SUCCESS,
    CONTENT_DELETE_FAIL,
  } from "../Constants/content";
  
  // Upload Content Reducer
  export const contentUploadReducer = (state = {}, action) => {
    switch (action.type) {
      case CONTENT_UPLOAD_REQUEST:
        return { loading: true };
      case CONTENT_UPLOAD_SUCCESS:
        return { loading: false, success: true, content: action.payload };
      case CONTENT_UPLOAD_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  // Fetch All Content Reducer
  export const contentFetchAllReducer = (state = { contents: [] }, action) => {
    switch (action.type) {
      case CONTENT_FETCH_ALL_REQUEST:
        return { ...state, loading: true };
      case CONTENT_FETCH_ALL_SUCCESS:
        return { ...state, loading: false, contents: action.payload };
      case CONTENT_FETCH_ALL_FAIL:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  // Fetch Content by ID Reducer
  export const contentFetchByIdReducer = (state = { content: {} }, action) => {
    switch (action.type) {
      case CONTENT_FETCH_BY_ID_REQUEST:
        return { loading: true, content: {} }; // Initialize content as an empty object
      case CONTENT_FETCH_BY_ID_SUCCESS:
        return { loading: false, content: action.payload }; // Store the content object
      case CONTENT_FETCH_BY_ID_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  // Delete Content Reducer
  export const contentDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case CONTENT_DELETE_REQUEST:
        return { loading: true };
      case CONTENT_DELETE_SUCCESS:
        return { loading: false, success: true };
      case CONTENT_DELETE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };