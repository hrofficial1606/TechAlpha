package org.techalfa.auth.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.techalfa.auth.dto.HackathonContentRequest;
import org.techalfa.auth.dto.HackathonContentResponse;
import org.techalfa.auth.dto.HackathonInfoItemDto;
import org.techalfa.auth.dto.HackathonPrizeCardDto;
import org.techalfa.auth.dto.HackathonTimelineItemDto;
import org.techalfa.auth.entity.HackathonContent;
import org.techalfa.auth.repository.HackathonContentRepository;

import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class HackathonContentService {

    private static final String PAGE_KEY = "DEFAULT";

    private final HackathonContentRepository hackathonContentRepository;
    private final ObjectMapper objectMapper;

    public HackathonContentResponse getPublicContent() {
        return hackathonContentRepository.findByPageKey(PAGE_KEY)
                .map(this::toResponse)
                .orElse(new HackathonContentResponse(
                        null, null, null, List.of(),
                        null, null, null, List.of(),
                        null, List.of(),
                        null, null, null,
                        null, null, null, List.of(), List.of(),
                        null, null, null, List.of(),
                        null, null, null, null, List.of(),
                        null, null, null, null, List.of(),
                        null
                ));
    }

    @Transactional
    public HackathonContentResponse save(HackathonContentRequest request) {
        HackathonContent content = hackathonContentRepository.findByPageKey(PAGE_KEY)
                .orElseGet(() -> {
                    HackathonContent newContent = new HackathonContent();
                    newContent.setPageKey(PAGE_KEY);
                    return newContent;
                });

        content.setHeroTitle(normalize(request.heroTitle()));
        content.setHeroSubtitle(normalize(request.heroSubtitle()));
        content.setAboutTitle(normalize(request.aboutTitle()));
        content.setAboutParagraphsJson(writeList(request.aboutParagraphs()));
        content.setPrizesTitle(normalize(request.prizesTitle()));
        content.setPrizesSubtitle(normalize(request.prizesSubtitle()));
        content.setPrizesTotal(normalize(request.prizesTotal()));
        content.setPrizeCardsJson(writeList(request.prizeCards()));
        content.setContactTitle(normalize(request.contactTitle()));
        content.setContactItemsJson(writeList(request.contactItems()));
        content.setVenueTitle(normalize(request.venueTitle()));
        content.setVenueName(normalize(request.venueName()));
        content.setVenueLink(normalize(request.venueLink()));
        content.setTimelineTitle(normalize(request.timelineTitle()));
        content.setDay1Label(normalize(request.day1Label()));
        content.setDay2Label(normalize(request.day2Label()));
        content.setDay1EventsJson(writeList(request.day1Events()));
        content.setDay2EventsJson(writeList(request.day2Events()));
        content.setSponsorsTitle(normalize(request.sponsorsTitle()));
        content.setSponsorImageUrl(normalize(request.sponsorImageUrl()));
        content.setSponsorName(normalize(request.sponsorName()));
        content.setSponsorParagraphsJson(writeList(request.sponsorParagraphs()));
        content.setCollaborationTitle(normalize(request.collaborationTitle()));
        content.setCollaborationImageUrl(normalize(request.collaborationImageUrl()));
        content.setCollaborationName(normalize(request.collaborationName()));
        content.setCollaborationSubtitle(normalize(request.collaborationSubtitle()));
        content.setCollaborationParagraphsJson(writeList(request.collaborationParagraphs()));
        content.setHackathonSectionTitle(normalize(request.hackathonSectionTitle()));
        content.setHackathonImageUrl(normalize(request.hackathonImageUrl()));
        content.setHackathonCardTitle(normalize(request.hackathonCardTitle()));
        content.setHackathonCardSubtitle(normalize(request.hackathonCardSubtitle()));
        content.setHackathonHighlightsJson(writeList(request.hackathonHighlights()));

        return toResponse(hackathonContentRepository.save(content));
    }

    private HackathonContentResponse toResponse(HackathonContent content) {
        return new HackathonContentResponse(
                content.getHeroTitle(),
                content.getHeroSubtitle(),
                content.getAboutTitle(),
                readList(content.getAboutParagraphsJson(), new TypeReference<>() {}),
                content.getPrizesTitle(),
                content.getPrizesSubtitle(),
                content.getPrizesTotal(),
                readList(content.getPrizeCardsJson(), new TypeReference<>() {}),
                content.getContactTitle(),
                readList(content.getContactItemsJson(), new TypeReference<>() {}),
                content.getVenueTitle(),
                content.getVenueName(),
                content.getVenueLink(),
                content.getTimelineTitle(),
                content.getDay1Label(),
                content.getDay2Label(),
                readList(content.getDay1EventsJson(), new TypeReference<>() {}),
                readList(content.getDay2EventsJson(), new TypeReference<>() {}),
                content.getSponsorsTitle(),
                content.getSponsorImageUrl(),
                content.getSponsorName(),
                readList(content.getSponsorParagraphsJson(), new TypeReference<>() {}),
                content.getCollaborationTitle(),
                content.getCollaborationImageUrl(),
                content.getCollaborationName(),
                content.getCollaborationSubtitle(),
                readList(content.getCollaborationParagraphsJson(), new TypeReference<>() {}),
                content.getHackathonSectionTitle(),
                content.getHackathonImageUrl(),
                content.getHackathonCardTitle(),
                content.getHackathonCardSubtitle(),
                readList(content.getHackathonHighlightsJson(), new TypeReference<>() {}),
                content.getUpdatedAt()
        );
    }

    private String normalize(String value) {
        if (value == null) {
            return null;
        }
        String trimmed = value.trim();
        return trimmed.isEmpty() ? null : trimmed;
    }

    private String writeList(Object value) {
        try {
            return objectMapper.writeValueAsString(value == null ? Collections.emptyList() : value);
        } catch (JsonProcessingException exception) {
            throw new IllegalArgumentException("Unable to save hackathon content.", exception);
        }
    }

    private <T> List<T> readList(String json, TypeReference<List<T>> typeReference) {
        if (json == null || json.isBlank()) {
            return List.of();
        }

        try {
            return objectMapper.readValue(json, typeReference);
        } catch (JsonProcessingException exception) {
            throw new IllegalStateException("Unable to read hackathon content.", exception);
        }
    }
}
