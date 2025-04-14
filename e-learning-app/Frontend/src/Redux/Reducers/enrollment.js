import * as types from '../Constants/enrollment';

const initialState = {
  enrollments: [],
  loading: false,
  error: null,
  enrollmentsByStudent: [],
  enrollmentsByCourse: []
};

export const enrollmentReducer = (state = initialState, action) => {
  switch (action.type) {
    // General enrollment cases
    case types.ENROLLMENT_REQUEST:
      return { ...state, loading: true, error: null };
      
    case types.ENROLLMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        enrollments: [...state.enrollments, action.payload]
      };
      
    case types.ENROLLMENT_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // Get enrollments by student
    case types.GET_ENROLLMENTS_BY_STUDENT_REQUEST:
      return { ...state, loading: true, error: null };
      
    case types.GET_ENROLLMENTS_BY_STUDENT_SUCCESS:
      return {
        ...state,
        loading: false,
        enrollmentsByStudent: action.payload
      };
      
    case types.GET_ENROLLMENTS_BY_STUDENT_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // Get enrollments by course
    case types.GET_ENROLLMENTS_BY_COURSE_REQUEST:
      return { ...state, loading: true, error: null };
      
    case types.GET_ENROLLMENTS_BY_COURSE_SUCCESS:
      return {
        ...state,
        loading: false,
        enrollmentsByCourse: action.payload
      };
      
    case types.GET_ENROLLMENTS_BY_COURSE_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

