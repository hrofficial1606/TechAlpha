package org.techalfa.auth.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.techalfa.auth.config.AppProperties;
import org.techalfa.auth.dto.AdminUploadResponse;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CloudinaryUploadService {

    private final AppProperties properties;

    public AdminUploadResponse upload(MultipartFile file, String folder, String resourceType) {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("Please choose a file to upload.");
        }

        AppProperties.Cloudinary config = properties.cloudinary();
        if (config == null || isBlank(config.cloudName()) || isBlank(config.apiKey()) || isBlank(config.apiSecret())) {
            throw new IllegalArgumentException("Cloudinary is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.");
        }

        Cloudinary cloudinary = new Cloudinary(ObjectUtils.asMap(
                "cloud_name", config.cloudName(),
                "api_key", config.apiKey(),
                "api_secret", config.apiSecret()
        ));

        Map<String, Object> options = new HashMap<>();
        options.put("resource_type", isBlank(resourceType) ? "image" : resourceType);
        options.put("folder", buildFolder(folder, config.defaultFolder()));

        try {
            @SuppressWarnings("unchecked")
            Map<String, Object> uploadResult = cloudinary.uploader().upload(file.getBytes(), options);
            return new AdminUploadResponse(
                    String.valueOf(uploadResult.get("secure_url")),
                    String.valueOf(uploadResult.get("public_id")),
                    String.valueOf(uploadResult.get("resource_type")),
                    uploadResult.get("format") != null ? String.valueOf(uploadResult.get("format")) : null
            );
        } catch (IOException exception) {
            throw new IllegalArgumentException("Unable to upload file to Cloudinary.");
        }
    }

    private String buildFolder(String folder, String defaultFolder) {
        String cleanedFolder = isBlank(folder) ? defaultFolder : folder.trim();
        return isBlank(cleanedFolder) ? "techalfa" : cleanedFolder;
    }

    private boolean isBlank(String value) {
        return value == null || value.isBlank();
    }
}
