import { useEffect,useState } from "react";
import { getMyTickets } from "../services/ticketService";

function MyTickets(){

 const [tickets,setTickets] = useState([]);

 useEffect(()=>{

  const load = async ()=>{

   const data = await getMyTickets();

   setTickets(data);

  };

  load();

 },[]);

 return(

  <div>

   <h2>My Tickets</h2>

   {tickets.map(t => (

    <div key={t.id}>

      <h3>{t.event.title}</h3>

      <img src={`http://localhost:8080/ticket/qr/${t.id}`} />

    </div>

   ))}

  </div>

 );

}

export default MyTickets;