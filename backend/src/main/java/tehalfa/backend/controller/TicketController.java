package tehalfa.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tehalfa.backend.entity.EventRegistration;
import tehalfa.backend.repository.RegistrationRepository;

@RestController
@RequestMapping("/ticket")
@RequiredArgsConstructor
public class TicketController {

    private final RegistrationRepository repo;

    @GetMapping("/scan/{id}")
    public String scanTicket(@PathVariable Long id){

        EventRegistration ticket =
                repo.findById(id)
                        .orElseThrow();

        if(ticket.getTicketStatus().equals("USED"))
            return "Ticket Already Used ❌";

        ticket.setTicketStatus("USED");

        repo.save(ticket);

        return "Ticket Valid ✅ Welcome";
    }
}