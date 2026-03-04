package tehalfa.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

import tehalfa.backend.entity.Gallery;
import tehalfa.backend.repository.GalleryRepository;

@Service
@RequiredArgsConstructor
public class GalleryService {

    private final GalleryRepository repo;

    public Gallery upload(Gallery gallery){
        return repo.save(gallery);
    }

    public List<Gallery> getAll(){
        return repo.findAll();
    }
}