package org.techalfa.auth.dto;

public record AdminUploadResponse(
        String url,
        String publicId,
        String resourceType,
        String format
) {
}
