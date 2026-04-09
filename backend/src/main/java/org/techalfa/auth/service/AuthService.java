package org.techalfa.auth.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.techalfa.auth.dto.AuthTokenResponse;
import org.techalfa.auth.dto.ForgotPasswordInitiateRequest;
import org.techalfa.auth.dto.ForgotPasswordResetRequest;
import org.techalfa.auth.dto.LoginInitiateRequest;
import org.techalfa.auth.dto.OtpVerificationRequest;
import org.techalfa.auth.dto.RegisterRequest;
import org.techalfa.auth.dto.UserProfileResponse;
import org.techalfa.auth.config.AppProperties;
import org.techalfa.auth.entity.OtpPurpose;
import org.techalfa.auth.entity.RoleName;
import org.techalfa.auth.entity.UserAccount;
import org.techalfa.auth.entity.UserOtp;
import org.techalfa.auth.repository.UserAccountRepository;
import org.techalfa.auth.security.AuthenticatedUser;
import org.techalfa.auth.security.JwtService;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserAccountRepository userAccountRepository;
    private final PasswordEncoder passwordEncoder;
    private final OtpService otpService;
    private final MailService mailService;
    private final JwtService jwtService;
    private final AppProperties properties;

    @Transactional
    public void initiateRegistration(RegisterRequest request) {
        String normalizedEmail = request.email().trim().toLowerCase();
        UserAccount user = userAccountRepository.findByEmailIgnoreCase(normalizedEmail)
                .orElseGet(UserAccount::new);

        if (user.getId() != null && user.isEmailVerified()) {
            throw new IllegalArgumentException("This email is already registered. Please login.");
        }

        user.setFullName(request.fullName().trim());
        user.setEmail(normalizedEmail);
        user.setMobileNumber(normalizeMobileNumber(request.mobileNumber()));
        user.setPasswordHash(passwordEncoder.encode(request.password()));
        user.setEmailVerified(false);
        user.setRoleName(resolveRoleForEmail(normalizedEmail));
        UserAccount savedUser = userAccountRepository.save(user);

        UserOtp otp = otpService.createOtp(savedUser, OtpPurpose.REGISTRATION);
        mailService.sendOtpEmail(savedUser.getEmail(), savedUser.getFullName(), otp.getOtpCode(), OtpPurpose.REGISTRATION);
    }

    @Transactional
    public void verifyRegistrationOtp(OtpVerificationRequest request) {
        UserAccount user = findUser(request.email());
        if (user.isEmailVerified()) {
            throw new IllegalArgumentException("Email is already verified.");
        }

        otpService.validateOtp(user, request.otp(), OtpPurpose.REGISTRATION);
        user.setEmailVerified(true);
        userAccountRepository.save(user);
    }

    @Transactional
    public AuthTokenResponse initiateLogin(LoginInitiateRequest request) {
        UserAccount user = findUser(request.email());
        if (!user.isEmailVerified()) {
            throw new BadCredentialsException("Please verify your email first.");
        }
        if (!passwordEncoder.matches(request.password(), user.getPasswordHash())) {
            throw new BadCredentialsException("Invalid email or password.");
        }

        AuthenticatedUser authenticatedUser = new AuthenticatedUser(user);
        String token = jwtService.generateToken(authenticatedUser);

        return new AuthTokenResponse(
                token,
                "Bearer",
                jwtService.getExpirationMinutes(),
                new UserProfileResponse(
                        user.getId(),
                        user.getFullName(),
                        user.getEmail(),
                        user.getMobileNumber(),
                        user.isEmailVerified(),
                        user.getRoleName().name()
                )
        );
    }

    @Transactional
    public void initiatePasswordReset(ForgotPasswordInitiateRequest request) {
        UserAccount user = findUser(request.email());
        if (!user.isEmailVerified()) {
            throw new BadCredentialsException("Please verify your email first.");
        }

        UserOtp otp = otpService.createOtp(user, OtpPurpose.PASSWORD_RESET);
        mailService.sendOtpEmail(user.getEmail(), user.getFullName(), otp.getOtpCode(), OtpPurpose.PASSWORD_RESET);
    }

    @Transactional
    public void resetPassword(ForgotPasswordResetRequest request) {
        UserAccount user = findUser(request.email());
        otpService.validateOtp(user, request.otp(), OtpPurpose.PASSWORD_RESET);
        user.setPasswordHash(passwordEncoder.encode(request.newPassword()));
        userAccountRepository.save(user);
    }

    private UserAccount findUser(String email) {
        return userAccountRepository.findByEmailIgnoreCase(email.trim().toLowerCase())
                .orElseThrow(() -> new BadCredentialsException("User not found."));
    }

    private RoleName resolveRoleForEmail(String email) {
        String adminEmail = properties.admin().email();
        if (adminEmail != null && !adminEmail.isBlank() && adminEmail.equalsIgnoreCase(email)) {
            return RoleName.ADMIN;
        }
        return RoleName.USER;
    }

    private String normalizeMobileNumber(String mobileNumber) {
        return mobileNumber == null ? null : mobileNumber.replaceAll("\\s+", "").trim();
    }
}
