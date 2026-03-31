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

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "EVENT_REGISTRATIONS")
@SequenceGenerator(name = "event_registration_seq", sequenceName = "EVENT_REGISTRATION_SEQ", allocationSize = 1)
@Getter
@Setter
public class EventRegistration {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "event_registration_seq")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "USER_ID")
    private UserAccount user;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "EVENT_ID")
    private Event event;

    @Enumerated(EnumType.STRING)
    @Column(name = "STATUS", nullable = false, length = 20)
    private RegistrationStatus status;

    @Column(name = "PAYPAL_ORDER_ID", length = 80)
    private String paypalOrderId;

    @Column(name = "PAYPAL_CAPTURE_ID", length = 80)
    private String paypalCaptureId;

    @Column(name = "AMOUNT", nullable = false, precision = 12, scale = 2)
    private BigDecimal amount;

    @Column(name = "QR_TOKEN", nullable = false, unique = true, length = 80)
    private String qrToken;

    @Column(name = "CERTIFICATE_CODE", length = 80)
    private String certificateCode;

    @Column(name = "REGISTERED_AT", nullable = false)
    private LocalDateTime registeredAt;

    @Column(name = "PAID_AT")
    private LocalDateTime paidAt;

    @Column(name = "ATTENDED_AT")
    private LocalDateTime attendedAt;

    @PrePersist
    public void onCreate() {
        registeredAt = LocalDateTime.now();
    }
}
