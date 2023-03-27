import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://job-finder-server.onrender.com",
});

export default axiosInstance;
