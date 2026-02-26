package tehalfa.backend.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @PostMapping("/login")
    public String login(){
        return "TechAlfa Auth Working";
    }
}