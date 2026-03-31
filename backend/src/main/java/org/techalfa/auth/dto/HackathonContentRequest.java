package org.techalfa.auth.dto;

import jakarta.validation.Valid;

import java.util.List;

public record HackathonContentRequest(
        String heroTitle,
        String heroSubtitle,
        String aboutTitle,
        List<String> aboutParagraphs,
        String prizesTitle,
        String prizesSubtitle,
        String prizesTotal,
        @Valid List<HackathonPrizeCardDto> prizeCards,
        String contactTitle,
        @Valid List<HackathonInfoItemDto> contactItems,
        String venueTitle,
        String venueName,
        String venueLink,
        String timelineTitle,
        String day1Label,
        String day2Label,
        @Valid List<HackathonTimelineItemDto> day1Events,
        @Valid List<HackathonTimelineItemDto> day2Events,
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
        List<String> hackathonHighlights
) {
}
