import { useEffect, useState } from "react";
import { getEvents } from "../services/eventService";

function Workshops(){

  const [events,setEvents] = useState([]);

  useEffect(()=>{

    const loadEvents = async () => {

      const data = await getEvents();

      setEvents(data);

    };

    loadEvents();

  },[]);

  return(

    <div>

      {events.map(event => (

        <FuturisticCard
          key={event.id}
          id={event.id}
          title={event.title}
          price={event.price}
          image={event.image}
        />

      ))}

    </div>

  );

}
export default Workshops;