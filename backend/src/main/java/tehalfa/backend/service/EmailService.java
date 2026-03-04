package tehalfa.backend.service;

import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.File;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    public void sendOtp(String email,String otp){

        SimpleMailMessage message =
                new SimpleMailMessage();

        message.setTo(email);
        message.setSubject("TechAlfa OTP Verification");
        message.setText("Your OTP is: "+otp);

        mailSender.send(message);
    }
    public void sendTicket(String email, File pdf) throws Exception {

        MimeMessage message = mailSender.createMimeMessage();

        MimeMessageHelper helper =
                new MimeMessageHelper(message,true);

        helper.setTo(email);
        helper.setSubject("TechAlfa Event Ticket");

        helper.setText("Your ticket is attached.");

        helper.addAttachment("ticket.pdf", pdf);

        mailSender.send(message);
    }
}