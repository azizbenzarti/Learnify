import axios from "axios";
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

const BASE_URL =
  process.env.REACT_APP_COURSE_SERVICE_BASE_URL || "http://localhost:5000";

// ✅ Create CHAPTER
export const createChapter = (name, courseId) => async (dispatch) => {
  try {
    dispatch({ type: CHAPTER_CREATE_REQUEST });

    const { data } = await axios.post(`${BASE_URL}/chapter`, {
      title: name,
      course: courseId,
    });

    dispatch({ type: CHAPTER_CREATE_SUCCESS, payload: data.chapter });
  } catch (error) {
    dispatch({
      type: CHAPTER_CREATE_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// ✅ Fetch All CHAPTERs
export const listChapters = () => async (dispatch) => {
  try {
    dispatch({ type: CHAPTER_LIST_REQUEST });

    const { data } = await axios.get(`${BASE_URL}/chapter`);

    dispatch({ type: CHAPTER_LIST_SUCCESS, payload: data.chapters });
  } catch (error) {
    dispatch({
      type: CHAPTER_LIST_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// ✅ Get CHAPTER Details
export const getChapterDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: CHAPTER_DETAILS_REQUEST });

    const { data } = await axios.get(`${BASE_URL}/CHAPTER/${id}`);

    dispatch({ type: CHAPTER_DETAILS_SUCCESS, payload: data.chapter });
  } catch (error) {
    dispatch({
      type: CHAPTER_DETAILS_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// ✅ Delete CHAPTER
export const deleteChapter = (id) => async (dispatch) => {
  try {
    dispatch({ type: CHAPTER_DELETE_REQUEST });

    await axios.delete(`${BASE_URL}/chapter/${id}`);

    dispatch({ type: CHAPTER_DELETE_SUCCESS, payload: id });

    dispatch(listChapters());
  } catch (error) {
    dispatch({
      type: CHAPTER_DELETE_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};
export const resetChapterCreate = () => (dispatch) => {
  dispatch({ type: "CHAPTER_CREATE_RESET" });
};
