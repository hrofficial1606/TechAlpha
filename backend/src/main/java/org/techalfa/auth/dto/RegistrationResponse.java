package org.techalfa.auth.dto;

import org.techalfa.auth.entity.RegistrationStatus;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record RegistrationResponse(
        Long id,
        Long userId,
        String userFullName,
        String userEmail,
        Long eventId,
        String eventTitle,
        String eventImageUrl,
        String venue,
        LocalDateTime startsAt,
        BigDecimal amount,
        RegistrationStatus status,
        String qrImageUrl,
        String certificateCode,
        LocalDateTime registeredAt,
        LocalDateTime paidAt,
        LocalDateTime attendedAt
) {
}
