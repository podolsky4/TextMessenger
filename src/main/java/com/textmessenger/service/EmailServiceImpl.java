package com.textmessenger.service;

import com.textmessenger.config.AsyncConfiguration;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

@Service
public class EmailServiceImpl implements EmailService {

  private static final Logger log = LoggerFactory.getLogger(EmailServiceImpl.class);

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
  @Async
  public void sendEmailFromMethods(String mail, String subject, String text) {
    CompletableFuture<SimpleMailMessage> email = constructMail(mail, subject, text);
    try {
      javaMailSender.send(email.get());
    } catch (InterruptedException | MailException | ExecutionException e ) {
      log.error(String.valueOf(e));
    }

  }

  @Async
  public CompletableFuture<SimpleMailMessage> constructMail(String mail, String subject, String text){
    SimpleMailMessage email = new SimpleMailMessage();
    email.setTo(mail);
    email.setSubject(subject);
    email.setText(text);
    return CompletableFuture.completedFuture(email);
  }
}
