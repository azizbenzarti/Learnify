import {
    STUDYPLAN_CREATE_REQUEST,
    STUDYPLAN_CREATE_SUCCESS,
    STUDYPLAN_CREATE_FAIL,
   
    STUDENT_STUDYPLANS_REQUEST,
    STUDENT_STUDYPLANS_SUCCESS,
    STUDENT_STUDYPLANS_FAIL,
    
  } from '../Constants/studyPlan';
  
  export const createStudyPlanReducer = (state = {}, action) => {
    switch (action.type) {
      case STUDYPLAN_CREATE_REQUEST:
        return { loading: true };
      case STUDYPLAN_CREATE_SUCCESS:
        return { loading: false, success: true, data: action.payload };
      case STUDYPLAN_CREATE_FAIL:
        return { loading: false, error: action.payload };
      
      default:
        return state;
    }
  };
  


  export const studentStudyPlanReducer = (
    state = { studyPlan: null, loading: false, error: null }, // ✅ Explicit default
    action
  ) => {
    switch (action.type) {
      case STUDENT_STUDYPLANS_REQUEST:
        return { ...state, loading: true };
      case STUDENT_STUDYPLANS_SUCCESS:
        console.log("Payload received:", action.payload);
        return { ...state, loading: false, studyPlan: action.payload };
      case STUDENT_STUDYPLANS_FAIL:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };