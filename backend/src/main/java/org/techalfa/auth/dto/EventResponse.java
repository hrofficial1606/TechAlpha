package org.techalfa.auth.dto;

import org.techalfa.auth.entity.EventStatus;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record EventResponse(
        Long id,
        String title,
        String category,
        String description,
        String venue,
        String imageUrl,
        String brochureUrl,
        BigDecimal price,
        BigDecimal oldPrice,
        LocalDateTime startsAt,
        LocalDateTime endsAt,
        String highlightText,
        boolean certificateEnabled,
        EventStatus status
) {
}
