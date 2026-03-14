package org.techalfa.auth.dto;

public record UserProfileResponse(
        Long id,
        String fullName,
        String email,
        boolean verified
) {
}
