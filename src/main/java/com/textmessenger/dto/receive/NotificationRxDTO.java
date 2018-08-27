package com.textmessenger.dto.receive;

import lombok.Data;

@Data
public class NotificationRxDTO {

  private long id;

  private boolean isChecked;

  private long contentId;

  private String type;

  private UserRxDTO user;
}
