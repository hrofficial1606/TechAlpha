package org.techalfa.auth.dto;

public record AdminDashboardResponse(
        long totalUsers,
        long totalEvents,
        long totalRegistrations,
        long paidRegistrations,
        long galleryItems
) {
}
