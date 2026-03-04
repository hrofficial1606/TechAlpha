package tehalfa.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

import tehalfa.backend.entity.Event;
import tehalfa.backend.repository.EventRepository;

@Service
@RequiredArgsConstructor
public class EventService {

    private final EventRepository repo;

    // CREATE EVENT
    public Event create(Event event){

        event.setAvailableSeats(event.getTotalSeats());
        event.setStatus("AVAILABLE");

        return repo.save(event);
    }

    // GET ALL EVENTS
    public List<Event> getAll(){
        return repo.findAll();
    }

    // UPDATE EVENT
    public Event update(Long id, Event updated){

        Event event = repo.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Event not found"));

        event.setTitle(updated.getTitle());
        event.setDescription(updated.getDescription());
        event.setPrice(updated.getPrice());
        event.setTotalSeats(updated.getTotalSeats());
        event.setEventDate(updated.getEventDate());

        return repo.save(event);
    }

    // DELETE EVENT
    public void delete(Long id){
        repo.deleteById(id);
    }

    // ADMIN CHANGE STATUS MANUALLY
    public Event changeStatus(Long eventId, String status){

        Event event = repo.findById(eventId)
                .orElseThrow(() ->
                        new RuntimeException("Event not found"));

        event.setStatus(status);

        return repo.save(event);
    }
}