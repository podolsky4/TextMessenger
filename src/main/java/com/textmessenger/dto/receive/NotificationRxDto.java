package com.textmessenger.dto.receive;

import lombok.Data;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

@Data
public class NotificationRxDto {

  private long id;

  private boolean isChecked;

  private long contentId;

  private String type;

  @NotNull
  @Valid
  private UserRxDto user;
}
