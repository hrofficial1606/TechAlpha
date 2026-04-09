package org.techalfa.auth.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.techalfa.auth.dto.ApiResponse;
import org.techalfa.auth.dto.AuthTokenResponse;
import org.techalfa.auth.dto.ForgotPasswordInitiateRequest;
import org.techalfa.auth.dto.ForgotPasswordResetRequest;
import org.techalfa.auth.dto.LoginInitiateRequest;
import org.techalfa.auth.dto.OtpVerificationRequest;
import org.techalfa.auth.dto.RegisterRequest;
import org.techalfa.auth.service.AuthService;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register/initiate")
    public ResponseEntity<ApiResponse> initiateRegistration(@Valid @RequestBody RegisterRequest request) {
        authService.initiateRegistration(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ApiResponse("Registration OTP sent to your email."));
    }

    @PostMapping("/register/verify")
    public ResponseEntity<ApiResponse> verifyRegistration(@Valid @RequestBody OtpVerificationRequest request) {
        authService.verifyRegistrationOtp(request);
        return ResponseEntity.ok(new ApiResponse("Registration verified successfully. You can login now."));
    }

    @PostMapping("/login/initiate")
    public ResponseEntity<AuthTokenResponse> initiateLogin(@Valid @RequestBody LoginInitiateRequest request) {
        return ResponseEntity.ok(authService.initiateLogin(request));
    }

    @PostMapping("/forgot-password/initiate")
    public ResponseEntity<ApiResponse> initiateForgotPassword(@Valid @RequestBody ForgotPasswordInitiateRequest request) {
        authService.initiatePasswordReset(request);
        return ResponseEntity.ok(new ApiResponse("Password reset OTP sent to your email."));
    }

    @PostMapping("/forgot-password/verify")
    public ResponseEntity<ApiResponse> verifyForgotPassword(@Valid @RequestBody ForgotPasswordResetRequest request) {
        authService.resetPassword(request);
        return ResponseEntity.ok(new ApiResponse("Password updated successfully. Please login with your new password."));
    }
}
