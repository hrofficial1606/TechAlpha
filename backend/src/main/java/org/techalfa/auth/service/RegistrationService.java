package org.techalfa.auth.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.techalfa.auth.dto.CertificateResponse;
import org.techalfa.auth.dto.CreatePayPalOrderResponse;
import org.techalfa.auth.dto.RegistrationResponse;
import org.techalfa.auth.entity.Event;
import org.techalfa.auth.entity.EventRegistration;
import org.techalfa.auth.entity.EventStatus;
import org.techalfa.auth.entity.RegistrationStatus;
import org.techalfa.auth.entity.UserAccount;
import org.techalfa.auth.repository.EventRegistrationRepository;
import org.techalfa.auth.repository.UserAccountRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RegistrationService {

    private final EventRegistrationRepository eventRegistrationRepository;
    private final EventService eventService;
    private final UserAccountRepository userAccountRepository;
    private final PayPalService payPalService;
    private final NotificationService notificationService;

    @Transactional
    public CreatePayPalOrderResponse createPayPalOrder(Long eventId, String email) {
        UserAccount user = findUser(email);
        Event event = eventService.findEvent(eventId);

        if (event.getStatus() != EventStatus.PUBLISHED && event.getStatus() != EventStatus.SOLD_OUT) {
            throw new IllegalArgumentException("This event is not open for registration.");
        }

        EventRegistration registration = eventRegistrationRepository.findByUserAndEvent(user, event)
                .orElseGet(() -> {
                    EventRegistration newRegistration = new EventRegistration();
                    newRegistration.setUser(user);
                    newRegistration.setEvent(event);
                    newRegistration.setAmount(event.getPrice());
                    newRegistration.setStatus(RegistrationStatus.PENDING_PAYMENT);
                    newRegistration.setQrToken(UUID.randomUUID().toString());
                    return newRegistration;
                });

        if (registration.getStatus() == RegistrationStatus.PAID || registration.getStatus() == RegistrationStatus.ATTENDED) {
            throw new IllegalArgumentException("You already have a confirmed registration for this event.");
        }

        EventRegistration savedRegistration = eventRegistrationRepository.save(registration);
        CreatePayPalOrderResponse orderResponse = payPalService.createOrder(savedRegistration);
        savedRegistration.setPaypalOrderId(orderResponse.orderId());
        eventRegistrationRepository.save(savedRegistration);
        return orderResponse;
    }

    @Transactional
    public RegistrationResponse capturePayPalOrder(String orderId, String email) {
        UserAccount user = findUser(email);
        EventRegistration registration = eventRegistrationRepository.findByPaypalOrderId(orderId)
                .orElseThrow(() -> new IllegalArgumentException("Registration payment request not found."));

        if (!registration.getUser().getId().equals(user.getId())) {
            throw new IllegalArgumentException("You cannot capture another user's order.");
        }

        String captureId = payPalService.captureOrder(orderId);
        registration.setPaypalCaptureId(captureId);
        registration.setStatus(RegistrationStatus.PAID);
        registration.setPaidAt(LocalDateTime.now());
        EventRegistration savedRegistration = eventRegistrationRepository.save(registration);

        notificationService.createPaymentSuccessNotification(user, registration.getEvent());
        return toRegistrationResponse(savedRegistration);
    }

    public List<RegistrationResponse> getUserRegistrations(String email) {
        UserAccount user = findUser(email);
        return eventRegistrationRepository.findByUserOrderByRegisteredAtDesc(user)
                .stream()
                .map(RegistrationService::toRegistrationResponse)
                .toList();
    }

    public List<CertificateResponse> getCertificates(String email) {
        return getUserRegistrations(email).stream()
                .filter(registration -> registration.certificateCode() != null)
                .map(registration -> new CertificateResponse(
                        registration.id(),
                        registration.eventTitle(),
                        registration.certificateCode(),
                        registration.attendedAt()
                ))
                .toList();
    }

    @Transactional
    public RegistrationResponse markAttendance(Long registrationId) {
        EventRegistration registration = eventRegistrationRepository.findById(registrationId)
                .orElseThrow(() -> new IllegalArgumentException("Registration not found."));

        if (registration.getStatus() == RegistrationStatus.PENDING_PAYMENT) {
            throw new IllegalArgumentException("Payment is still pending for this registration.");
        }

        registration.setStatus(RegistrationStatus.ATTENDED);
        registration.setAttendedAt(LocalDateTime.now());
        if (registration.getCertificateCode() == null || registration.getCertificateCode().isBlank()) {
            registration.setCertificateCode("CERT-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        }

        EventRegistration savedRegistration = eventRegistrationRepository.save(registration);
        notificationService.createCertificateReadyNotification(savedRegistration);
        return toRegistrationResponse(savedRegistration);
    }

    public byte[] getQrCode(Long registrationId, String email, QrCodeService qrCodeService) {
        UserAccount user = findUser(email);
        EventRegistration registration = eventRegistrationRepository.findById(registrationId)
                .orElseThrow(() -> new IllegalArgumentException("Registration not found."));

        if (!registration.getUser().getId().equals(user.getId())) {
            throw new IllegalArgumentException("You cannot access another user's ticket.");
        }
        if (registration.getStatus() == RegistrationStatus.PENDING_PAYMENT) {
            throw new IllegalArgumentException("Complete payment to unlock your QR ticket.");
        }

        String payload = "TECHALFA|" + registration.getId() + "|" + registration.getQrToken() + "|" + registration.getEvent().getTitle();
        return qrCodeService.generatePng(payload);
    }

    private UserAccount findUser(String email) {
        return userAccountRepository.findByEmailIgnoreCase(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found."));
    }

    public static RegistrationResponse toRegistrationResponse(EventRegistration registration) {
        return new RegistrationResponse(
                registration.getId(),
                registration.getUser().getId(),
                registration.getUser().getFullName(),
                registration.getUser().getEmail(),
                registration.getEvent().getId(),
                registration.getEvent().getTitle(),
                registration.getEvent().getImageUrl(),
                registration.getEvent().getVenue(),
                registration.getEvent().getStartsAt(),
                registration.getAmount(),
                registration.getStatus(),
                "/api/secure/user/registrations/" + registration.getId() + "/qr-image",
                registration.getCertificateCode(),
                registration.getRegisteredAt(),
                registration.getPaidAt(),
                registration.getAttendedAt()
        );
    }
}
