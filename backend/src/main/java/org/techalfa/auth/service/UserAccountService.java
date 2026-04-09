package org.techalfa.auth.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.techalfa.auth.dto.UserDashboardResponse;
import org.techalfa.auth.dto.UserProfileResponse;
import org.techalfa.auth.entity.UserAccount;
import org.techalfa.auth.repository.UserAccountRepository;

@Service
@RequiredArgsConstructor
public class UserAccountService {

    private final UserAccountRepository userAccountRepository;
    private final RegistrationService registrationService;
    private final NotificationService notificationService;

    public UserProfileResponse getProfile(String email) {
        UserAccount user = findUser(email);
        return new UserProfileResponse(
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getMobileNumber(),
                user.isEmailVerified()
        );
    }

    public UserDashboardResponse getDashboard(String email) {
        UserAccount user = findUser(email);
        return new UserDashboardResponse(
                new UserProfileResponse(
                        user.getId(),
                        user.getFullName(),
                        user.getEmail(),
                        user.getMobileNumber(),
                        user.isEmailVerified()
                ),
                registrationService.getUserRegistrations(email),
                registrationService.getCertificates(email),
                notificationService.getUserNotifications(user),
                notificationService.getReminderHighlights(user)
        );
    }

    public UserAccount findUser(String email) {
        return userAccountRepository.findByEmailIgnoreCase(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found."));
    }
}
