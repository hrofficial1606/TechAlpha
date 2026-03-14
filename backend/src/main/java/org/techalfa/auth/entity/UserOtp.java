package org.techalfa.auth.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "USER_OTPS")
@SequenceGenerator(name = "user_otp_seq", sequenceName = "USER_OTP_SEQ", allocationSize = 1)
@Getter
@Setter
public class UserOtp {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_otp_seq")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "USER_ID")
    private UserAccount user;

    @Enumerated(EnumType.STRING)
    @Column(name = "PURPOSE", nullable = false, length = 30)
    private OtpPurpose purpose;

    @Column(name = "OTP_CODE", nullable = false, length = 10)
    private String otpCode;

    @Column(name = "EXPIRES_AT", nullable = false)
    private LocalDateTime expiresAt;

    @Column(name = "USED", nullable = false)
    private boolean used;

    @Column(name = "CREATED_AT", nullable = false)
    private LocalDateTime createdAt;

    @PrePersist
    public void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
