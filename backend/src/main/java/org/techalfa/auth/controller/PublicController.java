package org.techalfa.auth.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.techalfa.auth.dto.ApiResponse;

@RestController
@RequestMapping("/api/public")
public class PublicController {

    @GetMapping("/health")
    public ApiResponse health() {
        return new ApiResponse("Techalfa public API is available.");
    }
}
