package org.techalfa.auth.dto;

public record AuthTokenResponse(
        String token,
        String tokenType,
        long expiresInMinutes,
        UserProfileResponse user
) {
}
