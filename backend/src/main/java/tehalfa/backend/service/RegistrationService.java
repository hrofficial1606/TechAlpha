package tehalfa.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;

import tehalfa.backend.entity.*;
import tehalfa.backend.repository.*;

@Service
@RequiredArgsConstructor
public class RegistrationService {

    private final RegistrationRepository repo;
    private final EventRepository eventRepo;
    private final QrCodeService qrService;

    public void register(User user, Long eventId){

        Event event = eventRepo.findById(eventId)
                .orElseThrow(() ->
                        new RuntimeException("Event not found"));

        // BLOCK IF SOLD OUT
        if(event.getStatus().equals("SOLD_OUT"))
            throw new RuntimeException("Event Sold Out");

        if(event.getStatus().equals("CANCELLED"))
            throw new RuntimeException("Event Cancelled");

        if(event.getAvailableSeats() <= 0){
            event.setStatus("SOLD_OUT");
            throw new RuntimeException("Event Sold Out");
        }

        // DECREASE SEAT
        event.setAvailableSeats(
                event.getAvailableSeats() - 1);

        // AUTO SOLD OUT
        if(event.getAvailableSeats() <= 0){
            event.setStatus("SOLD_OUT");
        }

        EventRegistration reg =
                new EventRegistration();

        reg.setUser(user);
        reg.setEvent(event);
        reg.setPaymentStatus("PENDING");
        reg.setRegisteredAt(LocalDateTime.now());

        repo.save(reg);
    }
}