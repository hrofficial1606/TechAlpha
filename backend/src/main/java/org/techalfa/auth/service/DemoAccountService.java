package org.techalfa.auth.service;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.techalfa.auth.config.AppProperties;
import org.techalfa.auth.entity.RoleName;
import org.techalfa.auth.entity.UserAccount;
import org.techalfa.auth.repository.UserAccountRepository;

@Service
@Slf4j
@RequiredArgsConstructor
public class DemoAccountService {
    private final UserAccountRepository userAccountRepository;
    private final PasswordEncoder passwordEncoder;
    private final AppProperties properties;

    @PostConstruct
    @Transactional
    public void ensureAdminAccount() {
        enforceSingleAdmin();
        ensurePrimaryAdmin();
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

    private void ensurePrimaryAdmin() {
        AppProperties.Admin admin = properties.admin();
        if (admin == null || admin.email() == null || admin.email().isBlank()) {
            return;
        }

        userAccountRepository.findByEmailIgnoreCase(admin.email())
                .ifPresentOrElse(this::promoteExistingAdmin, () -> createAdminIfConfigured(admin));
    }

    private void promoteExistingAdmin(UserAccount user) {
        if (user.getRoleName() != RoleName.ADMIN || !user.isEmailVerified()) {
            user.setRoleName(RoleName.ADMIN);
            user.setEmailVerified(true);
            userAccountRepository.save(user);
        }
    }

    private void createAdminIfConfigured(AppProperties.Admin admin) {
        String initialPassword = admin.initialPassword();
        if (initialPassword == null || initialPassword.isBlank()) {
            log.warn("Admin account {} was not created because ADMIN_INITIAL_PASSWORD is not set.", admin.email());
            return;
        }

        UserAccount user = new UserAccount();
        user.setFullName(resolveAdminName(admin));
        user.setEmail(admin.email());
        user.setPasswordHash(passwordEncoder.encode(initialPassword));
        user.setEmailVerified(true);
        user.setRoleName(RoleName.ADMIN);
        userAccountRepository.save(user);
    }

    private String resolveAdminName(AppProperties.Admin admin) {
        if (admin.fullName() != null && !admin.fullName().isBlank()) {
            return admin.fullName();
        }
        return "TechAlpha Admin";
    }
}
