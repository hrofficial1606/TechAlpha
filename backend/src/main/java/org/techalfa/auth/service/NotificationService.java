package org.techalfa.auth.service;

import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.techalfa.auth.dto.NotificationResponse;
import org.techalfa.auth.dto.ReminderHighlightResponse;
import org.techalfa.auth.entity.Event;
import org.techalfa.auth.entity.EventRegistration;
import org.techalfa.auth.entity.NotificationType;
import org.techalfa.auth.entity.RegistrationStatus;
import org.techalfa.auth.entity.UserAccount;
import org.techalfa.auth.entity.UserNotification;
import org.techalfa.auth.repository.EventRegistrationRepository;
import org.techalfa.auth.repository.UserAccountRepository;
import org.techalfa.auth.repository.UserNotificationRepository;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final UserNotificationRepository userNotificationRepository;
    private final UserAccountRepository userAccountRepository;
    private final EventRegistrationRepository eventRegistrationRepository;

    @Transactional
    public void createEventPublishedNotifications(Event event) {
        List<UserAccount> users = userAccountRepository.findByEmailVerifiedTrue();
        for (UserAccount user : users) {
            createNotification(
                    user,
                    event,
                    NotificationType.EVENT_CREATED,
                    "New event added: " + event.getTitle(),
                    "A new TechAlpha event is live. Check the schedule and reserve your seat."
            );
        }
    }

    @Transactional
    public void createPaymentSuccessNotification(UserAccount user, Event event) {
        createNotification(
                user,
                event,
                NotificationType.PAYMENT_SUCCESS,
                "Payment confirmed for " + event.getTitle(),
                "Your PayPal payment is complete. Your QR ticket is ready in your profile."
        );
    }

    @Transactional
    public void createCertificateReadyNotification(EventRegistration registration) {
        createNotification(
                registration.getUser(),
                registration.getEvent(),
                NotificationType.CERTIFICATE_READY,
                "Certificate ready for " + registration.getEvent().getTitle(),
                "Your attendance has been marked and your certificate is now visible in your profile."
        );
    }

    public List<NotificationResponse> getUserNotifications(UserAccount user) {
        return userNotificationRepository.findByUserOrderByCreatedAtDesc(user)
                .stream()
                .map(notification -> new NotificationResponse(
                        notification.getId(),
                        notification.getType(),
                        notification.getTitle(),
                        notification.getMessage(),
                        notification.isRead(),
                        notification.getEvent() != null ? notification.getEvent().getId() : null,
                        notification.getCreatedAt()
                ))
                .toList();
    }

    public List<ReminderHighlightResponse> getReminderHighlights(UserAccount user) {
        return eventRegistrationRepository.findByUserOrderByRegisteredAtDesc(user)
                .stream()
                .filter(registration -> registration.getStatus() == RegistrationStatus.PAID
                        || registration.getStatus() == RegistrationStatus.ATTENDED)
                .filter(registration -> registration.getEvent().getStartsAt() != null)
                .filter(registration -> registration.getEvent().getStartsAt().isAfter(LocalDateTime.now()))
                .sorted(Comparator.comparing(registration -> registration.getEvent().getStartsAt()))
                .limit(3)
                .map(registration -> new ReminderHighlightResponse(
                        registration.getEvent().getId(),
                        registration.getEvent().getTitle(),
                        buildReminderMessage(registration),
                        registration.getEvent().getStartsAt()
                ))
                .toList();
    }

    @Scheduled(cron = "0 0 * * * *")
    @Transactional
    public void createUpcomingEventReminders() {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime reminderWindowEnd = now.plusHours(24);

        List<EventRegistration> registrations = eventRegistrationRepository.findByStatusInAndEvent_StartsAtBetween(
                List.of(RegistrationStatus.PAID, RegistrationStatus.ATTENDED),
                now,
                reminderWindowEnd
        );

        for (EventRegistration registration : registrations) {
            if (!userNotificationRepository.existsByUserAndEventAndType(
                    registration.getUser(),
                    registration.getEvent(),
                    NotificationType.EVENT_REMINDER
            )) {
                createNotification(
                        registration.getUser(),
                        registration.getEvent(),
                        NotificationType.EVENT_REMINDER,
                        "Reminder: " + registration.getEvent().getTitle(),
                        buildReminderMessage(registration)
                );
            }
        }
    }

    @Transactional
    protected void createNotification(
            UserAccount user,
            Event event,
            NotificationType type,
            String title,
            String message
    ) {
        UserNotification notification = new UserNotification();
        notification.setUser(user);
        notification.setEvent(event);
        notification.setType(type);
        notification.setTitle(title);
        notification.setMessage(message);
        notification.setRead(false);
        userNotificationRepository.save(notification);
    }

    private String buildReminderMessage(EventRegistration registration) {
        long hours = ChronoUnit.HOURS.between(LocalDateTime.now(), registration.getEvent().getStartsAt());
        if (hours <= 1) {
            return "Your event starts very soon. Keep your QR code ready for entry.";
        }
        return "Your event starts in " + hours + " hours at " + registration.getEvent().getVenue() + ".";
    }
}
