package org.techalfa.auth.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.techalfa.auth.entity.Event;
import org.techalfa.auth.entity.EventRegistration;
import org.techalfa.auth.entity.RegistrationStatus;
import org.techalfa.auth.entity.UserAccount;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface EventRegistrationRepository extends JpaRepository<EventRegistration, Long> {
    List<EventRegistration> findByUserOrderByRegisteredAtDesc(UserAccount user);

    List<EventRegistration> findByEventOrderByRegisteredAtDesc(Event event);

    Optional<EventRegistration> findByUserAndEvent(UserAccount user, Event event);

    Optional<EventRegistration> findByPaypalOrderId(String paypalOrderId);

    List<EventRegistration> findByStatusInAndEvent_StartsAtBetween(
            List<RegistrationStatus> statuses,
            LocalDateTime start,
            LocalDateTime end
    );

    long countByStatusIn(List<RegistrationStatus> statuses);

    void deleteByEvent(Event event);
}
