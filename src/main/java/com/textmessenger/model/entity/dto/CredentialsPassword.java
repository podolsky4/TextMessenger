package com.textmessenger.model.entity.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class CredentialsPassword {
  @NotBlank
  private String password;
  @NotBlank
  private String token;
}
