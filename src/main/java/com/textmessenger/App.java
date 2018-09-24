package com.textmessenger;

import com.textmessenger.config.AsyncApplicationProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
@EnableConfigurationProperties(AsyncApplicationProperties.class)
public class App {

  public static void main(String[] args) {
    SpringApplication.run(App.class, args);
  }

}
