package com.textmessenger.dto.transfer;

import lombok.Data;

@Data
public class NotificationTxDto {

  private long id;

  private boolean isChecked;

  private long contentId;

  private String type;

  private UserTxDto user;

}
