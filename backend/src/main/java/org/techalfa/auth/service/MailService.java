package org.techalfa.auth.service;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.techalfa.auth.config.AppProperties;
import org.techalfa.auth.entity.OtpPurpose;

@Service
@RequiredArgsConstructor
public class MailService {

    private final JavaMailSender mailSender;
    private final AppProperties properties;

    public void sendOtpEmail(String toEmail, String fullName, String otp, OtpPurpose purpose) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(properties.mail().fromAddress());
        message.setTo(toEmail);
        message.setSubject(purpose == OtpPurpose.REGISTRATION
                ? "Techalfa registration OTP"
                : "Techalfa login OTP");
        message.setText(buildMessage(fullName, otp, purpose));
        mailSender.send(message);
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
}
