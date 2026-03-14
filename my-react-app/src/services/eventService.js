import API from "./api";

export const getEvents = async ()=>{

 const res = await API.get("/events");

 return res.data;

};

export const createEvent = async (event)=>{

 const res = await API.post("/events",event);

 return res.data;

};