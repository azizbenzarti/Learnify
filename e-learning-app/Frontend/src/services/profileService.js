import axios from "axios";

const BASE_URL = process.env.REACT_APP_AUTHSERVICE_PROFILE_BASE_URL;

const profileService = {
  getAllStudentData: async () => {
    try {
      const token = localStorage.getItem("jwt");
      if (!token) {
        throw new Error("jwt not found");
      }
      const response = await axios.get(`${BASE_URL}/getallstudentdata`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });

      return response.data;
    } catch (error) {
      throw error.response?.data || error; // Return the error response data
    }
  },

  getAllStudents: async () => {
    try {
      const token = localStorage.getItem("jwt");
      if (!token) {
        throw new Error("jwt not found");
      }
      const response = await axios.get(`${BASE_URL}/student`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      throw error.response?.data || error; // Return the error response data
    }
  }
};

export default profileService;
