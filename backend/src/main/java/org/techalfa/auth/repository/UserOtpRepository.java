package org.techalfa.auth.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.techalfa.auth.entity.OtpPurpose;
import org.techalfa.auth.entity.UserAccount;
import org.techalfa.auth.entity.UserOtp;

import java.util.List;
import java.util.Optional;

public interface UserOtpRepository extends JpaRepository<UserOtp, Long> {
    List<UserOtp> findByUserAndPurposeAndUsedFalse(UserAccount user, OtpPurpose purpose);

    Optional<UserOtp> findTopByUserAndPurposeAndOtpCodeAndUsedFalseOrderByCreatedAtDesc(
            UserAccount user,
            OtpPurpose purpose,
            String otpCode
    );
}
