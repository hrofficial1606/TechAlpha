package tehalfa.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tehalfa.backend.entity.Gallery;

public interface GalleryRepository
        extends JpaRepository<Gallery,Long> {
}