package com.textmessenger.service;

public interface EmailService {
  void sendEmailFromMethods(String mail, String subject, String setText, String token);

  void sendEmailFromMethods(String mail, String subject, String text);
}
