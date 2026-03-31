package org.techalfa.auth.dto;

import java.time.LocalDateTime;

public record ReminderHighlightResponse(
        Long eventId,
        String eventTitle,
        String message,
        LocalDateTime startsAt
) {
}
