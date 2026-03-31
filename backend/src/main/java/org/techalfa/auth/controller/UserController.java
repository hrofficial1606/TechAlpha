package org.techalfa.auth.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.techalfa.auth.dto.CapturePayPalOrderRequest;
import org.techalfa.auth.dto.CreatePayPalOrderResponse;
import org.techalfa.auth.dto.RegistrationResponse;
import org.techalfa.auth.dto.UserDashboardResponse;
import org.techalfa.auth.dto.UserProfileResponse;
import org.techalfa.auth.service.QrCodeService;
import org.techalfa.auth.service.RegistrationService;
import org.techalfa.auth.service.UserAccountService;

import java.util.List;

@RestController
@RequestMapping("/api/secure/user")
@RequiredArgsConstructor
public class UserController {

    private final UserAccountService userAccountService;
    private final RegistrationService registrationService;
    private final QrCodeService qrCodeService;

    @GetMapping("/profile")
    public UserProfileResponse profile(Authentication authentication) {
        return userAccountService.getProfile(authentication.getName());
    }

    @GetMapping("/dashboard")
    public UserDashboardResponse dashboard(Authentication authentication) {
        return userAccountService.getDashboard(authentication.getName());
    }

    @GetMapping("/registrations")
    public List<RegistrationResponse> registrations(Authentication authentication) {
        return registrationService.getUserRegistrations(authentication.getName());
    }

    @PostMapping("/registrations/{eventId}/paypal-order")
    public CreatePayPalOrderResponse createPayPalOrder(@PathVariable Long eventId, Authentication authentication) {
        return registrationService.createPayPalOrder(eventId, authentication.getName());
    }

    @PostMapping("/registrations/paypal/capture")
    public RegistrationResponse capturePayPalOrder(
            @Valid @RequestBody CapturePayPalOrderRequest request,
            Authentication authentication
    ) {
        return registrationService.capturePayPalOrder(request.orderId(), authentication.getName());
    }

    @GetMapping(value = "/registrations/{registrationId}/qr-image", produces = MediaType.IMAGE_PNG_VALUE)
    public byte[] qrImage(@PathVariable Long registrationId, Authentication authentication) {
        return registrationService.getQrCode(registrationId, authentication.getName(), qrCodeService);
    }
}
