package tehalfa.backend.service;

import org.springframework.stereotype.Service;
import tehalfa.backend.repository.UserRepository;
import tehalfa.backend.entity.User;

@Service
public class AuthService {

    private final UserRepository repo;

    public AuthService(UserRepository repo){
        this.repo = repo;
    }

    public User login(String username){
        return repo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}