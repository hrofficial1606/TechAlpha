package tehalfa.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;

import tehalfa.backend.dto.*;
import tehalfa.backend.entity.*;
import tehalfa.backend.repository.UserRepository;
import tehalfa.backend.security.JwtUtil;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository repo;
    private final PasswordEncoder encoder;
    private final JwtUtil jwt;
    private final OtpService otpService;
    private final EmailService emailService;



    public String verifyOtp(String email,String otp){

        User user = repo.findByEmail(email)
                .orElseThrow();

        if(user.isVerified())
            return "Already Verified";

        if(!user.getOtp().equals(otp))
            throw new RuntimeException("Invalid OTP");

        if(user.getOtpExpiry().isBefore(LocalDateTime.now()))
            throw new RuntimeException("OTP Expired");

        user.setVerified(true);
        user.setOtp(null);

        repo.save(user);

        return "Account Verified";
    }
    // REGISTER
    public String register(RegisterRequest request){

        if(repo.findByEmail(request.getEmail()).isPresent())
            throw new RuntimeException("Email already exists");

        String otp = otpService.generateOtp();

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(encoder.encode(request.getPassword()))
                .role(Role.USER)
                .verified(false)
                .otp(otp)
                .otpExpiry(LocalDateTime.now().plusMinutes(5))
                .createdAt(LocalDateTime.now())
                .build();

        repo.save(user);

        emailService.sendOtp(user.getEmail(),otp);

        return "OTP Sent to Email";
    }

    // LOGIN
    public AuthResponse login(LoginRequest request){

        User user = repo.findByEmail(request.getEmail())
                .orElseThrow();

        if(!user.isVerified())
            throw new RuntimeException("Verify OTP First");

        if(!encoder.matches(request.getPassword(),user.getPassword()))
            throw new RuntimeException("Invalid Password");

        String token =
                jwt.generateToken(user.getEmail(),
                        user.getRole().name());

        return new AuthResponse(token,user.getRole().name());
    }
}