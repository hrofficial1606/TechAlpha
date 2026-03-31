package org.techalfa.auth.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "EVENTS")
@SequenceGenerator(name = "event_seq", sequenceName = "EVENT_SEQ", allocationSize = 1)
@Getter
@Setter
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "event_seq")
    private Long id;

    @Column(name = "TITLE", nullable = false, length = 150)
    private String title;

    @Column(name = "CATEGORY", length = 60)
    private String category;

    @Column(name = "DESCRIPTION", length = 4000)
    private String description;

    @Column(name = "VENUE", length = 150)
    private String venue;

    @Column(name = "IMAGE_URL", length = 1000)
    private String imageUrl;

    @Column(name = "BROCHURE_URL", length = 1000)
    private String brochureUrl;

    @Column(name = "PRICE", nullable = false, precision = 12, scale = 2)
    private BigDecimal price;

    @Column(name = "OLD_PRICE", precision = 12, scale = 2)
    private BigDecimal oldPrice;

    @Column(name = "STARTS_AT", nullable = false)
    private LocalDateTime startsAt;

    @Column(name = "ENDS_AT")
    private LocalDateTime endsAt;

    @Column(name = "CERTIFICATE_ENABLED", nullable = false)
    private boolean certificateEnabled;

    @Column(name = "HIGHLIGHT_TEXT", length = 500)
    private String highlightText;

    @Enumerated(EnumType.STRING)
    @Column(name = "STATUS", nullable = false, length = 20)
    private EventStatus status;

    @Column(name = "CREATED_AT", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "UPDATED_AT", nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    public void onCreate() {
        LocalDateTime now = LocalDateTime.now();
        createdAt = now;
        updatedAt = now;
    }

    @PreUpdate
    public void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
