package com.th.service;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.th.entity.Email;
import com.th.repository.EmailRepository;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private EmailRepository emailRepository;

    public void sendEmail(String to, String subject, String body) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            // Set the sender's email address
            helper.setFrom("transithive.system@gmail.com");

            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(body, true);
            mailSender.send(message);

//            // Log email as sent
//            Email email = new Email(null, to, subject, body, LocalDateTime.now(), "SENT");
//            emailRepository.save(email);

        } catch (MessagingException e) {
//            // Log email as failed
//            Email email = new Email(null, to, subject, body, LocalDateTime.now(), "FAILED");
//            emailRepository.save(email);
            e.printStackTrace();
        }
    }
}


