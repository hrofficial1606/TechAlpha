package tehalfa.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tehalfa.backend.dto.AuthRequest;
import tehalfa.backend.dto.AuthResponse;
import tehalfa.backend.service.AuthService;
import tehalfa.backend.entity.User;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@CrossOrigin
public class AuthController {

    private final AuthService service;

    @PostMapping("/register")
    public String register(@RequestBody User user){
        service.register(user);
        return "User Registered";
    }

    @PostMapping("/login")
    public AuthResponse login(
            @RequestBody AuthRequest request){

        String token = service.login(request);
        return new AuthResponse(token);
    }
}