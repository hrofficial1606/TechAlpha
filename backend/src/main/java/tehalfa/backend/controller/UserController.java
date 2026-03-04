package tehalfa.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;

import tehalfa.backend.entity.User;
import tehalfa.backend.repository.UserRepository;
import tehalfa.backend.service.RegistrationService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final RegistrationService service;
    private final UserRepository userRepo;

    @PostMapping("/register/{eventId}")
    public String register(@PathVariable Long eventId,
                           Authentication auth){

        User user =
                userRepo.findByEmail(auth.getName()).get();

        service.register(user,eventId);

        return "Event Registered";
    }
}