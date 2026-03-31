package org.techalfa.auth.dto;

import java.time.LocalDateTime;
import java.util.List;

public record HackathonContentResponse(
        String heroTitle,
        String heroSubtitle,
        String aboutTitle,
        List<String> aboutParagraphs,
        String prizesTitle,
        String prizesSubtitle,
        String prizesTotal,
        List<HackathonPrizeCardDto> prizeCards,
        String contactTitle,
        List<HackathonInfoItemDto> contactItems,
        String venueTitle,
        String venueName,
        String venueLink,
        String timelineTitle,
        String day1Label,
        String day2Label,
        List<HackathonTimelineItemDto> day1Events,
        List<HackathonTimelineItemDto> day2Events,
        String sponsorsTitle,
        String sponsorImageUrl,
        String sponsorName,
        List<String> sponsorParagraphs,
        String collaborationTitle,
        String collaborationImageUrl,
        String collaborationName,
        String collaborationSubtitle,
        List<String> collaborationParagraphs,
        String hackathonSectionTitle,
        String hackathonImageUrl,
        String hackathonCardTitle,
        String hackathonCardSubtitle,
        List<String> hackathonHighlights,
        LocalDateTime updatedAt
) {
}
