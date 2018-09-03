package com.textmessenger.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

@PropertySource("amazon.properties")
@Component
public class EmailSender {

  @Value("${emailLogin}")
  private String login;

  @Value("${emailPassword}")
  private String password;

  @Bean
  public Java
}
