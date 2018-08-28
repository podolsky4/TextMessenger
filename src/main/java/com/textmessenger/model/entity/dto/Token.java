package com.textmessenger.model.entity.dto;

import lombok.Data;

@Data
public class Token {
  private String accessToken;
  private final String tokenType = "Bearer";

  public Token (String s){
    this.accessToken = s;
  }
}
