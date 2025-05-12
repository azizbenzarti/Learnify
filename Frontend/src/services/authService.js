import axios from "axios";

const BASE_URL = process.env.REACT_APP_AUTHSERVICE_USER_BASE_URL;

const authService = {
  login: async (email, password) => {
    // console.log("Login function called with email");// Debugging 
    try {
      const response = await axios.post(`${BASE_URL}/login`, {
        email,
        password,
      });
      console.log("API Response:", response.data); // Debugging
      return response.data;
    } catch (error) {
      throw error.response?.data || error; // Return the error response data
    }
  },

  userSignUp: async (userData) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/studentregister`,
        userData
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error; // Return the error response data
    }
  },

  tutorSignUp: async (tutorData) => {
    try {
      const response = await axios.post(`${BASE_URL}/tutorregister`, tutorData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error; // Return the error response data
    }
  },

  forgetPassword: async (email) => {
    try {
      const response = await axios.post(`${BASE_URL}/forget-password`, {
        email,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error; // Return the error response data
    }
  },

  resetPassword: async (newPassword, token) => {
    try {
      const response = await axios.post(`${BASE_URL}/reset-password`, {
        newPassword,
        token,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error; // Return the error response data
    }
  },

 };

export default authService;
