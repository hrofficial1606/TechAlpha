package org.techalfa.auth.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.techalfa.auth.entity.MediaType;

public record AdminGalleryRequest(
        Long eventId,
        @NotBlank String title,
        @NotNull MediaType mediaType,
        @NotBlank String mediaUrl,
        String thumbnailUrl
) {
}
