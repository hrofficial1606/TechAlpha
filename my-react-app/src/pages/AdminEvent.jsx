import { useState } from "react";
import { createEvent } from "../services/eventService";

function AdminEvent(){

 const [title,setTitle] = useState("");
 const [price,setPrice] = useState("");

 const submit = async () => {

  await createEvent({
    title,
    price
  });

  alert("Event Created");

 };

 return(

  <div>

   <input
    placeholder="Title"
    onChange={(e)=>setTitle(e.target.value)}
   />

   <input
    placeholder="Price"
    onChange={(e)=>setPrice(e.target.value)}
   />

   <button onClick={submit}>
     Create Event
   </button>

  </div>

 );

}

export default AdminEvent;