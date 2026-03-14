package org.techalfa.auth.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.techalfa.auth.dto.UserProfileResponse;
import org.techalfa.auth.service.UserAccountService;

@RestController
@RequestMapping("/api/secure/user")
@RequiredArgsConstructor
public class UserController {

    private final UserAccountService userAccountService;

    @GetMapping("/profile")
    public UserProfileResponse profile(Authentication authentication) {
        return userAccountService.getProfile(authentication.getName());
    }
}
