package tehalfa.backend.controller;

import java.util.List;
import org.springframework.web.bind.annotation.*;

import tehalfa.backend.entity.Event;
import tehalfa.backend.service.EventService;

@RestController
@RequestMapping("/events")
@CrossOrigin(origins="http://localhost:5173")
public class EventController {

    private final EventService service;

    public EventController(EventService service){
        this.service = service;
    }

    @PostMapping
    public Event create(@RequestBody Event event){
        return service.save(event);
    }

    @GetMapping
    public List<Event> getAll(){
        return service.getAll();
    }
}