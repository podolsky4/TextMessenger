package com.textmessenger.dto.receive;

import lombok.Data;

import javax.persistence.Column;

@Data
public class UserLoginRxDTO {

  @Column(name = "login")
  private String login;

  @Column(name = "email")
  private String email;

  @Column(name = "password")
  private String password;
}
