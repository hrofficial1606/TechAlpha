package tehalfa.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tehalfa.backend.entity.Gallery;
import tehalfa.backend.repository.GalleryRepository;
import tehalfa.backend.service.CloudinaryService;

@RestController
@RequestMapping("/admin/gallery")
@RequiredArgsConstructor
public class GalleryController {

    private final CloudinaryService cloudinaryService;
    private final GalleryRepository repo;

    @PostMapping("/upload")
    public Gallery upload(
            @RequestParam MultipartFile file,
            @RequestParam String title
    ) throws Exception {

        String url = cloudinaryService.uploadFile(file);

        Gallery g = new Gallery();
        g.setTitle(title);
        g.setMediaUrl(url);
        g.setType("IMAGE");

        return repo.save(g);
    }
}