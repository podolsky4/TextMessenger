package com.textmessenger;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
public class HealthCheckController {

  @RequestMapping("/healthcheck")
  public String index() {
    return "live";
  }

}
