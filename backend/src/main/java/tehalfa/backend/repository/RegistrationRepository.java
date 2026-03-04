package tehalfa.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tehalfa.backend.entity.EventRegistration;
import java.util.List;

public interface RegistrationRepository
        extends JpaRepository<EventRegistration,Long> {

    List<EventRegistration> findByEventId(Long eventId);
}