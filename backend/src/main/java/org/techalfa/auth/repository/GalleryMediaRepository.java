package org.techalfa.auth.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.techalfa.auth.entity.Event;
import org.techalfa.auth.entity.GalleryMedia;

import java.util.List;
import java.util.Optional;

public interface GalleryMediaRepository extends JpaRepository<GalleryMedia, Long> {
    List<GalleryMedia> findAllByOrderByCreatedAtDesc();

    void deleteByEvent(Event event);

    Optional<GalleryMedia> findById(Long id);
}
