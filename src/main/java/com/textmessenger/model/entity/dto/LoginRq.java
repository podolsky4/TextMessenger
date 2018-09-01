package com.textmessenger.model.entity.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;


@Data
public class LoginRq {
  @NotBlank
  private String loginOrEmail;

  @NotBlank
  private String password;
}
