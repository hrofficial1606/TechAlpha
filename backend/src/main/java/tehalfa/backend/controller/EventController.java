package tehalfa.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

import tehalfa.backend.entity.Event;
import tehalfa.backend.service.EventService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/admin/events")
public class EventController {

    private final EventService service;

    // CREATE EVENT
    @PostMapping
    public Event create(@RequestBody Event event){
        return service.create(event);
    }

    // GET ALL EVENTS
    @GetMapping
    public List<Event> getAll(){
        return service.getAll();
    }

    // UPDATE EVENT
    @PutMapping("/{id}")
    public Event update(@PathVariable Long id,
                        @RequestBody Event event){
        return service.update(id,event);
    }

    // DELETE EVENT
    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id){
        service.delete(id);
        return "Deleted Successfully";
    }

    // CHANGE STATUS (ADMIN MANUAL CONTROL)
    @PatchMapping("/status/{id}")
    public Event changeStatus(@PathVariable Long id,
                              @RequestParam String status){

        return service.changeStatus(id,status);
    }
}