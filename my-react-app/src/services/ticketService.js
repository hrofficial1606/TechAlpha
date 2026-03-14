import API from "./api";

export const registerEvent = async (eventId)=>{

 const res = await API.post(`/registration/${eventId}`);

 return res.data;

};

export const getMyTickets = async ()=>{

 const res = await API.get("/registration/my");

 return res.data;

};