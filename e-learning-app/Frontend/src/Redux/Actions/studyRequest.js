import axios from 'axios';
import {
  CREATE_STUDY_REQUEST_REQUEST,
  CREATE_STUDY_REQUEST_SUCCESS,
  CREATE_STUDY_REQUEST_FAIL,
  CREATE_STUDY_REQUEST_RESET,
} from '../Constants/studyRequest';


const API_URL =process.env.REACT_APP_STUDY_PLANNER_SERVICE_BASE_URL || "http://localhost:5002"
console.log("API_URL", API_URL);

// export const createStudyRequest = (studentId,token) => async (dispatch, getState) => {
//   try {
//     dispatch({ type: CREATE_STUDY_REQUEST_REQUEST });

    

//     const config = {
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//       },
//     };

//     const { response } = await axios.post(
//       `${API_URL}/studyrequest`,
//       { studentId },
//       config
//     );

//     dispatch({
//       type: CREATE_STUDY_REQUEST_SUCCESS,
//       payload: response.data,
//     });
//   } catch (error) {
//     dispatch({
//       type: CREATE_STUDY_REQUEST_FAIL,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     });
//   }
// };

export const createStudyRequest = (studentId, token) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_STUDY_REQUEST_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    // Remove the destructuring here - axios.post returns the response directly
    const response = await axios.post(
      `${API_URL}/studyrequest`,
      { studentId },
      config
    );

    dispatch({
      type: CREATE_STUDY_REQUEST_SUCCESS,
      payload: response.data.data, // Access the nested data property
    });

    // Return the study request data for potential use in the component
    return response.data.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    dispatch({
      type: CREATE_STUDY_REQUEST_FAIL,
      payload: errorMessage,
    });
    
    // Throw the error so components can catch it if needed
    throw new Error(errorMessage);
  }
};
export const resetStudyRequest = () => ({
    type: CREATE_STUDY_REQUEST_RESET,
  });
  