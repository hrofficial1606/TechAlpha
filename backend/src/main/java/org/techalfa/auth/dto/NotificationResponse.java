package org.techalfa.auth.dto;

import org.techalfa.auth.entity.NotificationType;

import java.time.LocalDateTime;

public record NotificationResponse(
        Long id,
        NotificationType type,
        String title,
        String message,
        boolean read,
        Long eventId,
        LocalDateTime createdAt
) {
}
