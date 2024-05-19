import axios from "axios";

// const API_URL = "http://localhost:8000";
const API_URL = "https://task-backend-nrkr.onrender.com";

const postData = async (url: string, data: any) => {
  try {
    const response = await axios.post(`${API_URL}/${url}`, data);
    return response.data;
  } catch (error: any) {
    console.error("Error while making POST request", error);
    return error?.response?.data;
  }
};

const getData = async (url: string, customHeader: any) => {
  try {
    const response = await axios.get(`${API_URL}/${url}`, {
      headers: {
        "Content-Type": "application/json",
        ...customHeader,
      }
    });
    return response.data;
  } catch (error: any) {
    console.error("Error while making GET request", error);
    return error?.response?.data;
  }
};

export { postData, getData };
