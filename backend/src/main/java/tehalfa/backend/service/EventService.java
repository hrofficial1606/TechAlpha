package tehalfa.backend.service;

import java.util.List;
import org.springframework.stereotype.Service;

import tehalfa.backend.entity.Event;
import tehalfa.backend.repository.EventRepository;

@Service
public class EventService {

    private final EventRepository repository;

    public EventService(EventRepository repository){
        this.repository = repository;
    }

    public Event save(Event event){
        return repository.save(event);
    }

    public List<Event> getAll(){
        return repository.findAll();
    }
}