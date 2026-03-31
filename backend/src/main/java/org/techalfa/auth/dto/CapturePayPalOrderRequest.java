package org.techalfa.auth.dto;

import jakarta.validation.constraints.NotBlank;

public record CapturePayPalOrderRequest(@NotBlank String orderId) {
}
