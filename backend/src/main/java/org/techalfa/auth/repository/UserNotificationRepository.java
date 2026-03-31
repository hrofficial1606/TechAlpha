package org.techalfa.auth.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.techalfa.auth.entity.Event;
import org.techalfa.auth.entity.NotificationType;
import org.techalfa.auth.entity.UserAccount;
import org.techalfa.auth.entity.UserNotification;

import java.util.List;

public interface UserNotificationRepository extends JpaRepository<UserNotification, Long> {
    List<UserNotification> findByUserOrderByCreatedAtDesc(UserAccount user);

    boolean existsByUserAndEventAndType(UserAccount user, Event event, NotificationType type);
}
