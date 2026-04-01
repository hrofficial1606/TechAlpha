package org.techalfa.auth.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "app")
public record AppProperties(
        Jwt jwt,
        Otp otp,
        Mail mail,
        Cors cors,
        Paypal paypal,
        Admin admin,
        Cloudinary cloudinary
) {
    public record Jwt(String secret, long expirationMinutes) {
    }

    public record Otp(int length, long expirationMinutes) {
    }

    public record Mail(String fromAddress) {
    }

    public record Cors(String allowedOrigins) {
    }

    public record Paypal(
            boolean enabled,
            String clientId,
            String clientSecret,
            String baseUrl,
            String returnUrl,
            String cancelUrl
    ) {
    }

    public record Admin(String email, String initialPassword, String fullName) {
    }

    public record Cloudinary(
            String cloudName,
            String apiKey,
            String apiSecret,
            String defaultFolder
    ) {
    }
}
