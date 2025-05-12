import axios from "axios";
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

import { BASE_URL } from "../Constants/BASE_URL";

// Upload Content
export const uploadContent = (file, chapterId) => async (dispatch) => {
  try {
    dispatch({ type: CONTENT_UPLOAD_REQUEST });

    const formData = new FormData();
    formData.append("file", file);
    formData.append("chapter", chapterId);

    const { data } = await axios.post(`${BASE_URL}/content`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    dispatch({ type: CONTENT_UPLOAD_SUCCESS, payload: data.content });

    
  } catch (error) {
    dispatch({
      type: CONTENT_UPLOAD_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Fetch All Content
export const fetchAllContent = () => async (dispatch) => {
  try {
    dispatch({ type: CONTENT_FETCH_ALL_REQUEST });

    const { data } = await axios.get(`${BASE_URL}/content`);
    dispatch({ type: CONTENT_FETCH_ALL_SUCCESS, payload: data.contents });
  } catch (error) {
    dispatch({
      type: CONTENT_FETCH_ALL_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Fetch Content by ID
export const fetchContentById = (id) => async (dispatch) => {
  try {
    dispatch({ type: CONTENT_FETCH_BY_ID_REQUEST });

    const { data } = await axios.get(`${BASE_URL}/content/${id}`, {
      params: { populate: "chapter,course" }, 
    });
    
    dispatch({ type: CONTENT_FETCH_BY_ID_SUCCESS, payload: data.content });
  } catch (error) {
    dispatch({
      type: CONTENT_FETCH_BY_ID_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Delete Content
export const deleteContent = (id) => async (dispatch) => {
  try {
    dispatch({ type: CONTENT_DELETE_REQUEST });

    await axios.delete(`${BASE_URL}/content/${id}`);
    dispatch({ type: CONTENT_DELETE_SUCCESS, payload: id });
  } catch (error) {
    dispatch({
      type: CONTENT_DELETE_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};