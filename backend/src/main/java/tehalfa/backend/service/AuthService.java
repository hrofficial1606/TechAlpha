package tehalfa.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import tehalfa.backend.dto.AuthRequest;
import tehalfa.backend.entity.Role;
import tehalfa.backend.entity.User;
import tehalfa.backend.repository.UserRepository;
import tehalfa.backend.security.JwtService;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository repo;
    private final PasswordEncoder encoder;
    private final JwtService jwtService;

    public void register(User user){
        user.setPassword(
                encoder.encode(user.getPassword()));
        user.setRole(Role.USER);
        repo.save(user);
    }

    public String login(AuthRequest request){

        User user = repo.findByEmail(request.getEmail())
                .orElseThrow();

        if(!encoder.matches(
                request.getPassword(),
                user.getPassword()))
            throw new RuntimeException("Invalid Login");

        return jwtService.generateToken(user.getEmail());
    }
}