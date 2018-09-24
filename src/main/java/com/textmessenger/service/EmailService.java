package com.textmessenger.service;

import com.textmessenger.config.AsyncConfiguration;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.scheduling.annotation.Async;

public interface EmailService {

  void sendEmail(SimpleMailMessage email);

  void sendEmailFromMethods(String mail, String subject, String setText, String token);

  void sendEmailFromMethods(String mail, String subject, String text);
}
