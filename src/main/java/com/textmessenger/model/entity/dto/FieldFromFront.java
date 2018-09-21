package com.textmessenger.model.entity.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class FieldFromFront {
  @NotBlank
  private String oldPassword;
  @NotBlank
  private String newPassword;
}
