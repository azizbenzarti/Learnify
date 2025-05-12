import axios from "axios";
const BASE_URL = process.env.REACT_APP_AUTHSERVICE_ADMIN_BASE_URL;

const getAuthToken = () => {
  return localStorage.getItem("jwt"); 
};


const adminService = {
  getallstudents: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/getallstudents`, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`, 
        },
      });
      console.log("API Response:", response.data); 
      return response.data;
    } catch (error) {
      throw error.response?.data || error; 
    }
  },
  getalltutors: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/getalltutors`, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      console.log("API Response:", response.data); 
      return response.data;
    } catch (error) {
      throw error.response?.data || error; 
    }
  },

  acceptTutor: async (tutorId) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/tutor/accept/${tutorId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
          },
        }
      );
      console.log("API Response:", response.data); 
      return response.data;
    } catch (error) {
      throw error.response?.data || error; 
    }
  },

  rejectTutor: async (tutorId) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/tutor/reject/${tutorId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
          },
        }
      );
      console.log("API Response:", response.data); 
      return response.data;
    } catch (error) {
      throw error.response?.data || error; 
    }
  },
  deletebyid: async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/deletebyid/${id}`, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      console.log("API Response:", response.data); 
      return response.data;
    } catch (error) {
      throw error.response?.data || error; 
    }
  },
  updatebyid: async (id, updatedData) => {
    try {
      const response = await axios.put(`${BASE_URL}/update/${id}`,updatedData ,{
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      console.log("API Response:", response.data); 
      return response.data;
    }
    catch (error) {
      throw error.response?.data || error; 
    }
  },

  getallcourses: async () => {
    try {
      const response = await axios.get("http://localhost:5000/course", {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      console.log("API Response:", response.data);
      return response.data;
    }
    catch (error) {
      throw error.response?.data || error;
    }
    },

};
export default adminService;
