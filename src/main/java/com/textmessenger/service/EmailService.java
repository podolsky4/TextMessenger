package com.textmessenger.service;

import org.springframework.mail.SimpleMailMessage;

public interface EmailService {

  void sendEmail(SimpleMailMessage email);

  void sendEmailFromMethods(String mail, String subject, String setText, String token);

  void sendEmailFromMethods(String mail, String subject, String text);
}
