package com.textmessenger.model.entity.dto;

import lombok.Data;

@Data
public class Token {
  private String accessToken;
  private static final String tokenType = "Bearer";

  public Token(String accessToken) {
    this.accessToken = accessToken;
  }
}
