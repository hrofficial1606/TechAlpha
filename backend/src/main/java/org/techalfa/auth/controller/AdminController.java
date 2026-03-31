package org.techalfa.auth.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.techalfa.auth.dto.AdminDashboardResponse;
import org.techalfa.auth.dto.AdminEventRequest;
import org.techalfa.auth.dto.AdminGalleryRequest;
import org.techalfa.auth.dto.AdminUploadResponse;
import org.techalfa.auth.dto.ApiResponse;
import org.techalfa.auth.dto.EventResponse;
import org.techalfa.auth.dto.GalleryItemResponse;
import org.techalfa.auth.dto.HackathonContentRequest;
import org.techalfa.auth.dto.HackathonContentResponse;
import org.techalfa.auth.dto.RegistrationResponse;
import org.techalfa.auth.entity.Event;
import org.techalfa.auth.service.AdminRegistrationPdfService;
import org.techalfa.auth.service.CloudinaryUploadService;
import org.techalfa.auth.service.EventService;
import org.techalfa.auth.service.HackathonContentService;
import org.techalfa.auth.service.RegistrationService;

import java.util.List;

@RestController
@RequestMapping("/api/secure/admin")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final EventService eventService;
    private final RegistrationService registrationService;
    private final HackathonContentService hackathonContentService;
    private final CloudinaryUploadService cloudinaryUploadService;
    private final AdminRegistrationPdfService adminRegistrationPdfService;

    @GetMapping("/dashboard")
    public AdminDashboardResponse dashboard() {
        return eventService.getAdminDashboard();
    }

    @PostMapping("/events")
    public EventResponse createEvent(@Valid @RequestBody AdminEventRequest request) {
        return eventService.createEvent(request);
    }

    @DeleteMapping("/events/{eventId}")
    public ApiResponse deleteEvent(@PathVariable Long eventId) {
        eventService.deleteEvent(eventId);
        return new ApiResponse("Event deleted successfully.");
    }

    @PostMapping("/gallery")
    public GalleryItemResponse addGalleryItem(@Valid @RequestBody AdminGalleryRequest request) {
        return eventService.addGalleryMedia(request);
    }

    @DeleteMapping("/gallery/{galleryItemId}")
    public ApiResponse deleteGalleryItem(@PathVariable Long galleryItemId) {
        eventService.deleteGalleryMedia(galleryItemId);
        return new ApiResponse("Gallery item deleted successfully.");
    }

    @PostMapping("/uploads")
    public AdminUploadResponse uploadMedia(
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "folder", required = false) String folder,
            @RequestParam(value = "resourceType", required = false) String resourceType
    ) {
        return cloudinaryUploadService.upload(file, folder, resourceType);
    }

    @GetMapping("/events/{eventId}/registrations")
    public List<RegistrationResponse> getEventRegistrations(@PathVariable Long eventId) {
        return eventService.getRegistrationsForEvent(eventId);
    }

    @GetMapping("/events/{eventId}/registrations/pdf")
    public ResponseEntity<byte[]> downloadEventRegistrationsPdf(@PathVariable Long eventId) {
        Event event = eventService.findEvent(eventId);
        byte[] pdf = adminRegistrationPdfService.generateEventRegistrationsPdf(
                event,
                eventService.getRegistrationsForEvent(eventId)
        );

        String safeTitle = event.getTitle() == null ? "event" : event.getTitle().trim().toLowerCase().replaceAll("[^a-z0-9]+", "-");
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, ContentDisposition.attachment()
                        .filename(safeTitle + "-registrations.pdf")
                        .build()
                        .toString())
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdf);
    }

    @PostMapping("/registrations/{registrationId}/attend")
    public RegistrationResponse markAttendance(@PathVariable Long registrationId) {
        return registrationService.markAttendance(registrationId);
    }

    @GetMapping("/hackathon-content")
    public HackathonContentResponse getHackathonContent() {
        return hackathonContentService.getPublicContent();
    }

    @PostMapping("/hackathon-content")
    public HackathonContentResponse saveHackathonContent(@RequestBody HackathonContentRequest request) {
        return hackathonContentService.save(request);
    }
}
