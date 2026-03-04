package tehalfa.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String description;

    private int price;

    private int totalSeats;

    private int availableSeats;

    private LocalDateTime eventDate;

    @Column(nullable = false)
    private String status;   // AVAILABLE / SOLD_OUT / CANCELLED
}