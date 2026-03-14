package org.techalfa.auth.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.techalfa.auth.dto.UserProfileResponse;
import org.techalfa.auth.entity.UserAccount;
import org.techalfa.auth.repository.UserAccountRepository;

@Service
@RequiredArgsConstructor
public class UserAccountService {

    private final UserAccountRepository userAccountRepository;

    public UserProfileResponse getProfile(String email) {
        UserAccount user = userAccountRepository.findByEmailIgnoreCase(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found."));
        return new UserProfileResponse(user.getId(), user.getFullName(), user.getEmail(), user.isEmailVerified());
    }
}
