package tehalfa.backend.security;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;
import tehalfa.backend.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService
        implements UserDetailsService {

    private final UserRepository repo;

    @Override
    public UserDetails loadUserByUsername(String email)
            throws UsernameNotFoundException {

        return repo.findByEmail(email)
                .map(user ->
                        User.withUsername(user.getEmail())
                                .password(user.getPassword())
                                .roles(user.getRole()
                                        .name()
                                        .replace("ROLE_",""))
                                .build())
                .orElseThrow();
    }
}