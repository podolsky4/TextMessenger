package com.text_messenger.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthCheckController {

  @RequestMapping("/healthcheck")
  public String index() {
    return "live";
  }
}
