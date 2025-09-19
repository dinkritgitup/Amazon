import axios from 'axios';
const axiosInstance = axios.create({
  // baseURL: "http://localhost:5000",
  baseURL: "https://amazon-api-deploy-zen3.onrender.com/",
});
export { axiosInstance };
