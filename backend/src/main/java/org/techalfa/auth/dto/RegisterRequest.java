package org.techalfa.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record RegisterRequest(
        @NotBlank @Size(min = 2, max = 100) String fullName,
        @NotBlank @Email String email,
        @NotBlank @Pattern(regexp = "\\d{10,15}", message = "Mobile number must be 10 to 15 digits") String mobileNumber,
        @NotBlank @Size(min = 8, max = 100) String password
) {
}
