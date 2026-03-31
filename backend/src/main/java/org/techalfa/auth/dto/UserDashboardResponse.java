package org.techalfa.auth.dto;

import java.util.List;

public record UserDashboardResponse(
        UserProfileResponse user,
        List<RegistrationResponse> registrations,
        List<CertificateResponse> certificates,
        List<NotificationResponse> notifications,
        List<ReminderHighlightResponse> highlights
) {
}
