package org.techalfa.auth.dto;

import org.techalfa.auth.entity.MediaType;

import java.time.LocalDateTime;

public record GalleryItemResponse(
        Long id,
        Long eventId,
        String eventTitle,
        String title,
        MediaType mediaType,
        String mediaUrl,
        String thumbnailUrl,
        LocalDateTime createdAt
) {
}
