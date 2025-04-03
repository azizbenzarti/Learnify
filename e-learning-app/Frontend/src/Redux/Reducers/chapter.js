import {
   CHAPTER_CREATE_REQUEST,
   CHAPTER_CREATE_SUCCESS,
   CHAPTER_CREATE_FAIL,
   CHAPTER_LIST_REQUEST,
   CHAPTER_LIST_SUCCESS,
   CHAPTER_LIST_FAIL,
   CHAPTER_DETAILS_REQUEST,
   CHAPTER_DETAILS_SUCCESS,
   CHAPTER_DETAILS_FAIL,
   CHAPTER_DELETE_REQUEST,
   CHAPTER_DELETE_SUCCESS,
   CHAPTER_DELETE_FAIL,
  } from "../Constants/chapter";
  
  
export const chapterCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case "CHAPTER_CREATE_REQUEST":
      return { loading: true };
    case "CHAPTER_CREATE_SUCCESS":
      return { loading: false, success: true };
    case "CHAPTER_CREATE_FAIL":
      return { loading: false, error: action.payload };
    case "CHAPTER_CREATE_RESET":
      return {}; 
    default:
      return state;
  }
};
  
  // ✅ ListCHAPTERs Reducer
  export const chapterListReducer = (state = { chapters: [] }, action) => {
    switch (action.type) {
      case CHAPTER_LIST_REQUEST:
        return { loading: true, chapters: [] };
      case CHAPTER_LIST_SUCCESS:
        return { loading: false, chapters: action.payload };
      case CHAPTER_LIST_FAIL:
        return { loading: false, error: action.payload };
      case CHAPTER_DELETE_SUCCESS:
        return {
          ...state,
          chapters: state.chapters.filter((chapter) => chapter._id !== action.payload),
        };
      default:
        return state;
    }
  };
  
  // ✅ GetCHAPTER Details Reducer
  export const chapterDetailsReducer = (state = {CHAPTER: {} }, action) => {
    switch (action.type) {
      case CHAPTER_DETAILS_REQUEST:
        return { loading: true, ...state };
      case CHAPTER_DETAILS_SUCCESS:
        return { loading: false,CHAPTER: action.payload };
      case CHAPTER_DETAILS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  // ✅ DeleteCHAPTER Reducer
  export const chapterDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case CHAPTER_DELETE_REQUEST:
        return { loading: true };
      case CHAPTER_DELETE_SUCCESS:
        return { loading: false, success: true };
      case CHAPTER_DELETE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  