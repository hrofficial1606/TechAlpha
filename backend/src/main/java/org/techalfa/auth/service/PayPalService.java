package org.techalfa.auth.service;

import com.fasterxml.jackson.databind.JsonNode;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClient;
import org.techalfa.auth.config.AppProperties;
import org.techalfa.auth.dto.CreatePayPalOrderResponse;
import org.techalfa.auth.entity.EventRegistration;

import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class PayPalService {

    private final AppProperties properties;
    private final RestClient restClient = RestClient.builder().build();

    public CreatePayPalOrderResponse createOrder(EventRegistration registration) {
        ensureConfigured();
        String accessToken = fetchAccessToken();

        Map<String, Object> amount = Map.of(
                "currency_code", "USD",
                "value", registration.getAmount().toPlainString()
        );
        Map<String, Object> orderBody = new HashMap<>();
        orderBody.put("intent", "CAPTURE");
        orderBody.put("purchase_units", List.of(Map.of(
                "reference_id", String.valueOf(registration.getId()),
                "description", registration.getEvent().getTitle(),
                "amount", amount
        )));
        orderBody.put("application_context", Map.of(
                "return_url", properties.paypal().returnUrl(),
                "cancel_url", properties.paypal().cancelUrl(),
                "user_action", "PAY_NOW"
        ));

        JsonNode response = restClient.post()
                .uri(properties.paypal().baseUrl() + "/v2/checkout/orders")
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .contentType(MediaType.APPLICATION_JSON)
                .body(orderBody)
                .retrieve()
                .body(JsonNode.class);

        String approvalUrl = response.path("links").findValuesAsText("href").stream()
                .filter(link -> link.contains("/checkoutnow"))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("PayPal approval URL not returned."));

        return new CreatePayPalOrderResponse(
                registration.getId(),
                response.path("id").asText(),
                approvalUrl
        );
    }

    public String captureOrder(String orderId) {
        ensureConfigured();
        String accessToken = fetchAccessToken();

        JsonNode response = restClient.post()
                .uri(properties.paypal().baseUrl() + "/v2/checkout/orders/" + orderId + "/capture")
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .contentType(MediaType.APPLICATION_JSON)
                .retrieve()
                .body(JsonNode.class);

        if (!"COMPLETED".equalsIgnoreCase(response.path("status").asText())) {
            throw new IllegalArgumentException("PayPal payment is not completed yet.");
        }

        return response.path("purchase_units")
                .path(0)
                .path("payments")
                .path("captures")
                .path(0)
                .path("id")
                .asText();
    }

    private String fetchAccessToken() {
        String clientCredentials = properties.paypal().clientId() + ":" + properties.paypal().clientSecret();
        String authHeader = "Basic " + Base64.getEncoder().encodeToString(clientCredentials.getBytes());
        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("grant_type", "client_credentials");

        JsonNode response = restClient.post()
                .uri(properties.paypal().baseUrl() + "/v1/oauth2/token")
                .header(HttpHeaders.AUTHORIZATION, authHeader)
                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                .body(body)
                .retrieve()
                .body(JsonNode.class);

        return response.path("access_token").asText();
    }

    private void ensureConfigured() {
        if (!properties.paypal().enabled()
                || properties.paypal().clientId() == null || properties.paypal().clientId().isBlank()
                || properties.paypal().clientSecret() == null || properties.paypal().clientSecret().isBlank()) {
            throw new IllegalArgumentException("PayPal is not configured yet. Please set PayPal environment variables.");
        }
    }
}
