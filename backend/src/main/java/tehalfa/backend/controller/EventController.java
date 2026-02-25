package tehalfa.backend.controller;

import lombok.RequiredArgsConstructor;
import org.hibernate.mapping.List;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import tehalfa.backend.entity.Event;

@RestController
@RequestMapping("/events")
@RequiredArgsConstructor
public class EventController {

    private final EventService service;

    // 👑 ADMIN ONLY
    @PostMapping("/create")
    @PreAuthorize("hasRole('ADMIN')")
    public Event createEvent(@RequestBody Event event){
        return service.save(event);
    }

    // 👥 ALL LOGGED USERS
    @GetMapping
    public List<Event> getAll(){
        return service.getAll();
    }
}