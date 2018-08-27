package com.textmessenger.dto.transfer;

import lombok.Data;

@Data
public class NotificationTxDTO {

  private long id;

  private boolean isChecked;

  private long contentId;

  private String type;

  private UserTxDTO user;
}
