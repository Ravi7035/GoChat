import axios from "axios";

 export const axiosInstance = axios.create({
  baseURL: import.meta.env.PROD 
  ? "" 
  : "http://localhost:5002/api",
  withCredentials: true
});
