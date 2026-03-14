package org.techalfa.auth.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "app")
public record AppProperties(
        Jwt jwt,
        Otp otp,
        Mail mail,
        Cors cors
) {
    public record Jwt(String secret, long expirationMinutes) {
    }

    public record Otp(int length, long expirationMinutes) {
    }

    public record Mail(String fromAddress) {
    }

    public record Cors(String allowedOrigins) {
    }
}
