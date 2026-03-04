package tehalfa.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
public class Gallery {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String mediaUrl;

    private String type; // IMAGE / VIDEO
}