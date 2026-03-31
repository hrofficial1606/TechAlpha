package org.techalfa.auth.dto;

public record CreatePayPalOrderResponse(
        Long registrationId,
        String orderId,
        String approvalUrl
) {
}
