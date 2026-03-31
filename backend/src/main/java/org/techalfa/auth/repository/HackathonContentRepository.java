package org.techalfa.auth.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.techalfa.auth.entity.HackathonContent;

import java.util.Optional;

public interface HackathonContentRepository extends JpaRepository<HackathonContent, Long> {
    Optional<HackathonContent> findByPageKey(String pageKey);
}
