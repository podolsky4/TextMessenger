package com.textmessenger.model.entity.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.constraints.NotBlank;

@AllArgsConstructor
@Data
public class SearchValue {
  @NotBlank
  private String search;
}
