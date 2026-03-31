package org.techalfa.auth.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "GALLERY_MEDIA")
@SequenceGenerator(name = "gallery_media_seq", sequenceName = "GALLERY_MEDIA_SEQ", allocationSize = 1)
@Getter
@Setter
public class GalleryMedia {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "gallery_media_seq")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "EVENT_ID")
    private Event event;

    @Enumerated(EnumType.STRING)
    @Column(name = "MEDIA_TYPE", nullable = false, length = 20)
    private MediaType mediaType;

    @Column(name = "TITLE", nullable = false, length = 150)
    private String title;

    @Column(name = "MEDIA_URL", nullable = false, length = 1000)
    private String mediaUrl;

    @Column(name = "THUMBNAIL_URL", length = 1000)
    private String thumbnailUrl;

    @Column(name = "CREATED_AT", nullable = false)
    private LocalDateTime createdAt;

    @PrePersist
    public void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
