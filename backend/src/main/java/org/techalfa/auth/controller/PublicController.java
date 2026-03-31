package org.techalfa.auth.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.techalfa.auth.dto.ApiResponse;
import org.techalfa.auth.dto.EventResponse;
import org.techalfa.auth.dto.GalleryItemResponse;
import org.techalfa.auth.dto.HackathonContentResponse;
import org.techalfa.auth.service.EventService;
import org.techalfa.auth.service.HackathonContentService;

import java.util.List;

@RestController
@RequestMapping("/api/public")
@RequiredArgsConstructor
public class PublicController {

    private final EventService eventService;
    private final HackathonContentService hackathonContentService;

    @GetMapping("/health")
    public ApiResponse health() {
        return new ApiResponse("Techalfa public API is available.");
    }

    @GetMapping("/events")
    public List<EventResponse> events() {
        return eventService.getPublicEvents();
    }

    @GetMapping("/events/{eventId}")
    public EventResponse event(@PathVariable Long eventId) {
        return eventService.getPublicEvent(eventId);
    }

    @GetMapping("/gallery")
    public List<GalleryItemResponse> gallery() {
        return eventService.getGallery();
    }

    @GetMapping("/hackathon-content")
    public HackathonContentResponse hackathonContent() {
        return hackathonContentService.getPublicContent();
    }
}
