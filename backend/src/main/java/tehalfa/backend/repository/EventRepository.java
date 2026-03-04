package tehalfa.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tehalfa.backend.entity.Event;

public interface EventRepository extends JpaRepository<Event,Long> {
}