package com.textmessenger.service;

import org.springframework.mail.SimpleMailMessage;

public interface EmailService {
  void sendEmail(SimpleMailMessage email);
}
