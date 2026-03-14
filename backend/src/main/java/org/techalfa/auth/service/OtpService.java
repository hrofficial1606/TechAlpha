package org.techalfa.auth.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.techalfa.auth.config.AppProperties;
import org.techalfa.auth.entity.OtpPurpose;
import org.techalfa.auth.entity.UserAccount;
import org.techalfa.auth.entity.UserOtp;
import org.techalfa.auth.repository.UserOtpRepository;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OtpService {

    private static final SecureRandom RANDOM = new SecureRandom();

    private final UserOtpRepository userOtpRepository;
    private final AppProperties properties;

    @Transactional
    public UserOtp createOtp(UserAccount user, OtpPurpose purpose) {
        List<UserOtp> existingOtps = userOtpRepository.findByUserAndPurposeAndUsedFalse(user, purpose);
        for (UserOtp existingOtp : existingOtps) {
            existingOtp.setUsed(true);
        }
        userOtpRepository.saveAll(existingOtps);

        UserOtp otp = new UserOtp();
        otp.setUser(user);
        otp.setPurpose(purpose);
        otp.setOtpCode(generateNumericOtp(properties.otp().length()));
        otp.setExpiresAt(LocalDateTime.now().plusMinutes(properties.otp().expirationMinutes()));
        otp.setUsed(false);
        return userOtpRepository.save(otp);
    }

    @Transactional
    public void validateOtp(UserAccount user, String otpCode, OtpPurpose purpose) {
        UserOtp otp = userOtpRepository.findTopByUserAndPurposeAndOtpCodeAndUsedFalseOrderByCreatedAtDesc(
                        user,
                        purpose,
                        otpCode
                )
                .orElseThrow(() -> new IllegalArgumentException("Invalid OTP."));

        if (otp.getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("OTP has expired. Please request a new one.");
        }

        otp.setUsed(true);
        userOtpRepository.save(otp);
    }

    private String generateNumericOtp(int length) {
        StringBuilder builder = new StringBuilder();
        for (int i = 0; i < length; i++) {
            builder.append(RANDOM.nextInt(10));
        }
        return builder.toString();
    }
}
