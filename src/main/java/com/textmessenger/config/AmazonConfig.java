package com.textmessenger.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

@PropertySource("amazon.propetries")
@Component
public class AmazonConfig {

  @Value("${Access_key}")
  private String accessKey;

  @Value("${Secret_key}")
  private String secretKey;


}
