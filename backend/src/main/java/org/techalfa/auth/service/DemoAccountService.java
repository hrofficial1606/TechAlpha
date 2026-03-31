package org.techalfa.auth.service;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.techalfa.auth.dto.UserDashboardResponse;
import org.techalfa.auth.dto.UserProfileResponse;
import org.techalfa.auth.config.AppProperties;
import org.techalfa.auth.entity.RoleName;
import org.techalfa.auth.entity.UserAccount;
import org.techalfa.auth.repository.UserAccountRepository;
import org.techalfa.auth.security.AuthenticatedUser;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class DemoAccountService {
    private static final DemoSeed PRIMARY_ADMIN = new DemoSeed(
            "Widesoftech Admin",
            "widesoftech@gmail.com",
            "Widesoftech@2026",
            RoleName.ADMIN
    );

    private final UserAccountRepository userAccountRepository;
    private final PasswordEncoder passwordEncoder;
    private final AppProperties properties;

    @PostConstruct
    @Transactional
    public void ensureDemoAccounts() {
        enforceSingleAdmin();
        saveSeed(PRIMARY_ADMIN);
    }

    private void saveSeed(DemoSeed seed) {
        UserAccount user = userAccountRepository.findByEmailIgnoreCase(seed.email())
                .orElseGet(UserAccount::new);

        user.setFullName(seed.fullName());
        user.setEmail(seed.email());
        user.setPasswordHash(passwordEncoder.encode(seed.password()));
        user.setEmailVerified(true);
        user.setRoleName(seed.roleName());

        userAccountRepository.save(user);
    }

    private void enforceSingleAdmin() {
        String adminEmail = properties.admin().email();
        if (adminEmail == null || adminEmail.isBlank()) {
            return;
        }

        userAccountRepository.findAll().forEach(user -> {
            RoleName expectedRole = user.getEmail() != null && user.getEmail().equalsIgnoreCase(adminEmail)
                    ? RoleName.ADMIN
                    : RoleName.USER;

            if (user.getRoleName() != expectedRole) {
                user.setRoleName(expectedRole);
                userAccountRepository.save(user);
            }
        });
    }

    private record DemoSeed(String fullName, String email, String password, RoleName roleName) {
    }
}
