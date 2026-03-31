package org.techalfa.auth.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "HACKATHON_CONTENT")
@SequenceGenerator(name = "hackathon_content_seq", sequenceName = "HACKATHON_CONTENT_SEQ", allocationSize = 1)
@Getter
@Setter
public class HackathonContent {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "hackathon_content_seq")
    private Long id;

    @Column(name = "PAGE_KEY", nullable = false, unique = true, length = 50)
    private String pageKey;

    @Column(name = "HERO_TITLE", length = 250)
    private String heroTitle;

    @Column(name = "HERO_SUBTITLE", length = 1000)
    private String heroSubtitle;

    @Column(name = "ABOUT_TITLE", length = 120)
    private String aboutTitle;

    @Lob
    @Column(name = "ABOUT_PARAGRAPHS")
    private String aboutParagraphsJson;

    @Column(name = "PRIZES_TITLE", length = 120)
    private String prizesTitle;

    @Column(name = "PRIZES_SUBTITLE", length = 500)
    private String prizesSubtitle;

    @Column(name = "PRIZES_TOTAL", length = 120)
    private String prizesTotal;

    @Lob
    @Column(name = "PRIZE_CARDS")
    private String prizeCardsJson;

    @Column(name = "CONTACT_TITLE", length = 120)
    private String contactTitle;

    @Lob
    @Column(name = "CONTACT_ITEMS")
    private String contactItemsJson;

    @Column(name = "VENUE_TITLE", length = 120)
    private String venueTitle;

    @Column(name = "VENUE_NAME", length = 500)
    private String venueName;

    @Column(name = "VENUE_LINK", length = 1000)
    private String venueLink;

    @Column(name = "TIMELINE_TITLE", length = 120)
    private String timelineTitle;

    @Column(name = "DAY1_LABEL", length = 60)
    private String day1Label;

    @Column(name = "DAY2_LABEL", length = 60)
    private String day2Label;

    @Lob
    @Column(name = "DAY1_EVENTS")
    private String day1EventsJson;

    @Lob
    @Column(name = "DAY2_EVENTS")
    private String day2EventsJson;

    @Column(name = "SPONSORS_TITLE", length = 120)
    private String sponsorsTitle;

    @Column(name = "SPONSOR_IMAGE_URL", length = 1000)
    private String sponsorImageUrl;

    @Column(name = "SPONSOR_NAME", length = 200)
    private String sponsorName;

    @Lob
    @Column(name = "SPONSOR_PARAGRAPHS")
    private String sponsorParagraphsJson;

    @Column(name = "COLLABORATION_TITLE", length = 120)
    private String collaborationTitle;

    @Column(name = "COLLABORATION_IMAGE_URL", length = 1000)
    private String collaborationImageUrl;

    @Column(name = "COLLABORATION_NAME", length = 250)
    private String collaborationName;

    @Column(name = "COLLABORATION_SUBTITLE", length = 250)
    private String collaborationSubtitle;

    @Lob
    @Column(name = "COLLABORATION_PARAGRAPHS")
    private String collaborationParagraphsJson;

    @Column(name = "HACKATHON_SECTION_TITLE", length = 120)
    private String hackathonSectionTitle;

    @Column(name = "HACKATHON_IMAGE_URL", length = 1000)
    private String hackathonImageUrl;

    @Column(name = "HACKATHON_CARD_TITLE", length = 200)
    private String hackathonCardTitle;

    @Column(name = "HACKATHON_CARD_SUBTITLE", length = 200)
    private String hackathonCardSubtitle;

    @Lob
    @Column(name = "HACKATHON_HIGHLIGHTS")
    private String hackathonHighlightsJson;

    @Column(name = "UPDATED_AT", nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    public void onCreate() {
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    public void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
