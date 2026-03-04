package tehalfa.backend.config;

import com.cloudinary.Cloudinary;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class CloudinaryConfig {

    @Bean
    public Cloudinary cloudinary() {

        Map<String,String> config = new HashMap<>();

        config.put("dcgjhbm7e","dcgjhbm7e");
        config.put("843674675794523","843674675794523");
        config.put("HxOQl_1dnAlWoGs5Y5Q2IG9VYfk","HxOQl_1dnAlWoGs5Y5Q2IG9VYfk");

        return new Cloudinary(config);
    }
}