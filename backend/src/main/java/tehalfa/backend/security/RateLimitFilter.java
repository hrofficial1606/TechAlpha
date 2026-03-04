package tehalfa.backend.security;

import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.time.Duration;

@Component
public class RateLimitFilter extends OncePerRequestFilter {

    private final Bucket bucket;

    public RateLimitFilter() {

        Bandwidth limit =
                Bandwidth.simple(20,
                        Duration.ofMinutes(1));

        bucket = Bucket.builder()
                .addLimit(limit)
                .build();
    }

    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain chain) throws IOException, ServletException {

        if(bucket.tryConsume(1)) {
            chain.doFilter(request,response);
        } else {
            response.setStatus(429);
            response.getWriter().write("Too many requests");
        }
    }
}