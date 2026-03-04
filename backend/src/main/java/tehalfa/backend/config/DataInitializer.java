package tehalfa.backend.config;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;

import tehalfa.backend.entity.*;
import tehalfa.backend.repository.UserRepository;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder encoder;

    @Override
    public void run(String... args) {

        if(userRepository.findByEmail("admin@techalfa.org").isEmpty()) {

            User admin = User.builder()
                    .name("Admin")
                    .email("admin@techalfa.org")
                    .password(encoder.encode("admin123"))
                    .role(Role.ADMIN)
                    .createdAt(LocalDateTime.now())
                    .build();

            userRepository.save(admin);
            System.out.println("Admin created");
        }
    }
}