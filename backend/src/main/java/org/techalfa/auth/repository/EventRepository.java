package org.techalfa.auth.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.techalfa.auth.entity.Event;
import org.techalfa.auth.entity.EventStatus;

import java.time.LocalDateTime;
import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long> {
    List<Event> findByStatusOrderByStartsAtAsc(EventStatus status);

    List<Event> findByStatusInOrderByStartsAtAsc(List<EventStatus> statuses);

    List<Event> findByStartsAtBetweenAndStatusIn(LocalDateTime start, LocalDateTime end, List<EventStatus> statuses);
}
