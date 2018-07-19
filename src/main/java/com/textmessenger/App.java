package com.textmessenger;

import com.textmessenger.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class App implements CommandLineRunner {

  private final UserService userService;

  @Autowired
  public App(UserService userService) {
    this.userService = userService;
  }

  public static void main(String[] args) {
    SpringApplication.run(App.class, args);
  }

  @Override  public void run(String... args) {
    System.out.println("---- Start retrieving all users from datasource ----");
    userService.findAll().forEach(System.out::println);
    System.out.println("---- Stop process ----");
  }
}
