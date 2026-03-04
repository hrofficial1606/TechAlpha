import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080",
});

export const login = (data) => API.post("/auth/login", data);

export const register = (data) => API.post("/auth/register", data);

export const getEvents = () => API.get("/events");

export const registerEvent = (id) =>
  API.post(`/registration/${id}`);

export const getDashboard = () =>
  API.get("/admin/dashboard");
API.interceptors.request.use((req)=>{

 const token = localStorage.getItem("token");

 if(token){
   req.headers.Authorization = `Bearer ${token}`;
 }
  return req;

});

export default API;