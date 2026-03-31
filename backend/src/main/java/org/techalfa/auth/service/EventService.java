package org.techalfa.auth.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.techalfa.auth.dto.AdminDashboardResponse;
import org.techalfa.auth.dto.AdminEventRequest;
import org.techalfa.auth.dto.AdminGalleryRequest;
import org.techalfa.auth.dto.EventResponse;
import org.techalfa.auth.dto.GalleryItemResponse;
import org.techalfa.auth.dto.RegistrationResponse;
import org.techalfa.auth.entity.Event;
import org.techalfa.auth.entity.EventRegistration;
import org.techalfa.auth.entity.EventStatus;
import org.techalfa.auth.entity.GalleryMedia;
import org.techalfa.auth.repository.EventRegistrationRepository;
import org.techalfa.auth.repository.EventRepository;
import org.techalfa.auth.repository.GalleryMediaRepository;
import org.techalfa.auth.repository.UserAccountRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EventService {

    private final EventRepository eventRepository;
    private final GalleryMediaRepository galleryMediaRepository;
    private final EventRegistrationRepository eventRegistrationRepository;
    private final UserAccountRepository userAccountRepository;
    private final NotificationService notificationService;

    public List<EventResponse> getPublicEvents() {
        return eventRepository.findByStatusInOrderByStartsAtAsc(List.of(EventStatus.PUBLISHED, EventStatus.SOLD_OUT))
                .stream()
                .map(this::toEventResponse)
                .toList();
    }

    public EventResponse getPublicEvent(Long eventId) {
        return toEventResponse(findEvent(eventId));
    }

    public List<GalleryItemResponse> getGallery() {
        return galleryMediaRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::toGalleryItemResponse)
                .toList();
    }

    @Transactional
    public EventResponse createEvent(AdminEventRequest request) {
        Event event = new Event();
        event.setTitle(request.title().trim());
        event.setCategory(request.category().trim());
        event.setDescription(request.description().trim());
        event.setVenue(request.venue().trim());
        event.setImageUrl(request.imageUrl());
        event.setBrochureUrl(request.brochureUrl());
        event.setPrice(request.price());
        event.setOldPrice(request.oldPrice());
        event.setStartsAt(request.startsAt());
        event.setEndsAt(request.endsAt());
        event.setCertificateEnabled(request.certificateEnabled());
        event.setHighlightText(request.highlightText());
        event.setStatus(EventStatus.PUBLISHED);
        Event savedEvent = eventRepository.save(event);

        notificationService.createEventPublishedNotifications(savedEvent);
        return toEventResponse(savedEvent);
    }

    @Transactional
    public GalleryItemResponse addGalleryMedia(AdminGalleryRequest request) {
        GalleryMedia media = new GalleryMedia();
        media.setTitle(request.title().trim());
        media.setMediaType(request.mediaType());
        media.setMediaUrl(request.mediaUrl().trim());
        media.setThumbnailUrl(request.thumbnailUrl());
        if (request.eventId() != null) {
            media.setEvent(findEvent(request.eventId()));
        }
        return toGalleryItemResponse(galleryMediaRepository.save(media));
    }

    @Transactional
    public void deleteEvent(Long eventId) {
        Event event = findEvent(eventId);
        galleryMediaRepository.deleteByEvent(event);
        eventRegistrationRepository.deleteByEvent(event);
        eventRepository.delete(event);
    }

    @Transactional
    public void deleteGalleryMedia(Long galleryItemId) {
        GalleryMedia media = galleryMediaRepository.findById(galleryItemId)
                .orElseThrow(() -> new IllegalArgumentException("Gallery item not found."));
        galleryMediaRepository.delete(media);
    }

    public List<RegistrationResponse> getRegistrationsForEvent(Long eventId) {
        Event event = findEvent(eventId);
        return eventRegistrationRepository.findByEventOrderByRegisteredAtDesc(event)
                .stream()
                .map(RegistrationService::toRegistrationResponse)
                .toList();
    }

    public AdminDashboardResponse getAdminDashboard() {
        return new AdminDashboardResponse(
                userAccountRepository.count(),
                eventRepository.count(),
                eventRegistrationRepository.count(),
                eventRegistrationRepository.countByStatusIn(List.of(
                        org.techalfa.auth.entity.RegistrationStatus.PAID,
                        org.techalfa.auth.entity.RegistrationStatus.ATTENDED
                )),
                galleryMediaRepository.count()
        );
    }

    public Event findEvent(Long eventId) {
        return eventRepository.findById(eventId)
                .orElseThrow(() -> new IllegalArgumentException("Event not found."));
    }

    private EventResponse toEventResponse(Event event) {
        return new EventResponse(
                event.getId(),
                event.getTitle(),
                event.getCategory(),
                event.getDescription(),
                event.getVenue(),
                event.getImageUrl(),
                event.getBrochureUrl(),
                event.getPrice(),
                event.getOldPrice(),
                event.getStartsAt(),
                event.getEndsAt(),
                event.getHighlightText(),
                event.isCertificateEnabled(),
                event.getStatus()
        );
    }

    private GalleryItemResponse toGalleryItemResponse(GalleryMedia media) {
        return new GalleryItemResponse(
                media.getId(),
                media.getEvent() != null ? media.getEvent().getId() : null,
                media.getEvent() != null ? media.getEvent().getTitle() : null,
                media.getTitle(),
                media.getMediaType(),
                media.getMediaUrl(),
                media.getThumbnailUrl(),
                media.getCreatedAt()
        );
    }
}
