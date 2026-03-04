package tehalfa.backend.service;

import com.cloudinary.Cloudinary;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class CloudinaryService {

    private final Cloudinary cloudinary;

    public String uploadFile(MultipartFile file) throws Exception {

        Map uploadResult = cloudinary.uploader().upload(
                file.getBytes(),
                Map.of("folder","techalfa-gallery")
        );

        return uploadResult.get("secure_url").toString();
    }
}