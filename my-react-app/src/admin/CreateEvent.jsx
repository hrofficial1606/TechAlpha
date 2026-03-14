import { useState } from "react";
import { createEvent } from "../services/eventService";

function CreateEvent(){

 const [title,setTitle] = useState("");
 const [price,setPrice] = useState("");

 const submit = async ()=>{

  await createEvent({
   title,
   price
  });

  alert("Event Created");

 };

 return(

  <div>

   <input
    placeholder="Event title"
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

export default CreateEvent;