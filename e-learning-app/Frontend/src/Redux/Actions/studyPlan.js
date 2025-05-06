import {
  STUDYPLAN_CREATE_REQUEST,
  STUDYPLAN_CREATE_SUCCESS,
  STUDYPLAN_CREATE_FAIL,

  STUDENT_STUDYPLANS_REQUEST,
  STUDENT_STUDYPLANS_SUCCESS,
  STUDENT_STUDYPLANS_FAIL,

  STUDYPLAN_RESET,
} from '../Constants/studyPlan';

const  BASE_URL = process.env.REACT_APP_STUDY_PLANNER_BASE_URL || 'http://localhost:5002';


export const createStudyPlan = (studyRequestId, token) => async (dispatch) => {
  console.log('token',token);
  try {
    dispatch({ type: STUDYPLAN_CREATE_REQUEST });

    const res = await fetch(`${ BASE_URL}/studyplan`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ studyRequestId }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || 'Failed to create study plan');

    dispatch({ type: STUDYPLAN_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: STUDYPLAN_CREATE_FAIL, payload: error.message });
  }
};

// export const getStudyPlan = (id, token) => async (dispatch) => {
//   try {
//     dispatch({ type: STUDYPLAN_DETAILS_REQUEST });

//     const res = await fetch(`${ BASE_URL}/studyplan/${id}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     const data = await res.json();
//     if (!res.ok) throw new Error(data.message || 'Failed to fetch study plan');

//     dispatch({ type: STUDYPLAN_DETAILS_SUCCESS, payload: data });
//   } catch (error) {
//     dispatch({ type: STUDYPLAN_DETAILS_FAIL, payload: error.message });
//   }
// };

export const getStudentStudyPlans = (studentId, token) => async (dispatch) => {
  console.log('token',token);

  try {
    dispatch({ type: STUDENT_STUDYPLANS_REQUEST });

    const res = await fetch(`${ BASE_URL}/studyplan/student/${studentId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const response = await res.json();
    if (!res.ok) throw new Error(response.message || 'Failed to fetch student plans');

    dispatch({ type: STUDENT_STUDYPLANS_SUCCESS, payload: response.data });
    console.log('STUDENT_STUDYPLANS_SUCCESS', response.data);
  } catch (error) {
    
    dispatch({ type: STUDENT_STUDYPLANS_FAIL, payload: error.message });
  }
};
// In your studyPlanActions.js
export const resetStudyPlan = () => (dispatch) => {
  dispatch({ type: STUDYPLAN_RESET });
};