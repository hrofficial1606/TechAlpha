package org.techalfa.auth.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record AdminEventRequest(
        @NotBlank String title,
        @NotBlank String category,
        @NotBlank String description,
        @NotBlank String venue,
        String imageUrl,
        String brochureUrl,
        @NotNull @DecimalMin("0.0") BigDecimal price,
        @DecimalMin("0.0") BigDecimal oldPrice,
        @NotNull LocalDateTime startsAt,
        LocalDateTime endsAt,
        boolean certificateEnabled,
        String highlightText
) {
}
