package org.techalfa.auth.service;

import lombok.extern.slf4j.Slf4j;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.techalfa.auth.config.AppProperties;
import org.techalfa.auth.entity.OtpPurpose;

@Service
@Slf4j
@RequiredArgsConstructor
public class MailService {

    private final JavaMailSender mailSender;
    private final AppProperties properties;
    @Value("${spring.mail.username:}")
    private String springMailUsername;

    public void sendOtpEmail(String toEmail, String fullName, String otp, OtpPurpose purpose) {
        String fromAddress = resolveFromAddress();

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromAddress);
        message.setTo(toEmail);
        message.setSubject(purpose == OtpPurpose.REGISTRATION
                ? "Techalfa registration OTP"
                : "Techalfa login OTP");
        message.setText(buildMessage(fullName, otp, purpose));

        try {
            mailSender.send(message);
        } catch (MailException exception) {
            log.error("Unable to send OTP mail to {} using from address {}", toEmail, fromAddress, exception);
            throw new IllegalArgumentException(
                    "OTP email could not be sent. Hostinger SMTP authentication failed. Check MAIL_USERNAME, MAIL_PASSWORD, and MAIL_FROM."
            );
        }
    }

    private String buildMessage(String fullName, String otp, OtpPurpose purpose) {
        String action = purpose == OtpPurpose.REGISTRATION ? "complete your registration" : "complete your login";
        return """
                Hello %s,

                Use this OTP to %s for techalfa.org:

                %s

                This OTP will expire in a few minutes. If you did not request this, please ignore this email.
                """.formatted(fullName, action, otp);
    }

    private String resolveFromAddress() {
        String fromAddress = properties.mail().fromAddress();
        if (fromAddress == null || fromAddress.isBlank()) {
            fromAddress = springMailUsername;
        }

        if (fromAddress == null || fromAddress.isBlank() || fromAddress.contains("your-email@gmail.com")) {
            throw new IllegalArgumentException(
                    "Mail is not configured. Set MAIL_USERNAME, MAIL_PASSWORD, and MAIL_FROM before sending OTP."
            );
        }

        return fromAddress;
    }
}
