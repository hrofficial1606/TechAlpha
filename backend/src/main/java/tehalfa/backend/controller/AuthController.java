package tehalfa.backend.controller;



import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tehalfa.backend.dto.*;
import tehalfa.backend.service.AuthService;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@CrossOrigin("*")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest request) {
        authService.register(request);
        return "User Registered Successfully";
    }

    @PostMapping("/verify-otp")
    public String verify(@RequestParam String email,
                         @RequestParam String otp){

        return authService.verifyOtp(email,otp);
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request) {
        return authService.login(request);
    }
}