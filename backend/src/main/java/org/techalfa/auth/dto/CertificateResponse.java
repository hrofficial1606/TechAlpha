package org.techalfa.auth.dto;

import java.time.LocalDateTime;

public record CertificateResponse(
        Long registrationId,
        String eventTitle,
        String certificateCode,
        LocalDateTime issuedAt
) {
}
