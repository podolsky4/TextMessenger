package com.textmessenger.service;

import com.textmessenger.config.AsyncConfiguration;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImpl implements EmailService {

  private JavaMailSender javaMailSender;

  public EmailServiceImpl(JavaMailSender javaMailSender) {
    this.javaMailSender = javaMailSender;
  }

  @Override
  @Async(AsyncConfiguration.TASK_EXECUTOR_SERVICE)
  public void sendEmail(SimpleMailMessage email) {
    javaMailSender.send(email);
  }

  @Override
  @Async(AsyncConfiguration.TASK_EXECUTOR_SERVICE)
  public void sendEmailFromMethods(String mail, String subject, String setText, String token) {
    SimpleMailMessage email = new SimpleMailMessage();
    email.setTo(mail);
    email.setSubject(subject);
    email.setText(setText + token);
    javaMailSender.send(email);
  }

  @Override
  public void sendEmailFromMethods(String mail, String subject, String text) {
    SimpleMailMessage email = new SimpleMailMessage();
    email.setTo(mail);
    email.setSubject(subject);
    email.setText(text);
    javaMailSender.send(email);
  }
}
