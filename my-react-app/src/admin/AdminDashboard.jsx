import { useEffect,useState } from "react";
import API from "../services/api";

function AdminDashboard(){

 const [data,setData] = useState({});

 useEffect(()=>{

  API.get("/admin/dashboard")
     .then(res=>setData(res.data));

 },[]);

 return(

  <div>

   <h1>Admin Dashboard</h1>

   <p>Total Users: {data.totalUsers}</p>
   <p>Total Events: {data.totalEvents}</p>
   <p>Total Registrations: {data.totalRegistrations}</p>

  </div>

 );

}

export default AdminDashboard;