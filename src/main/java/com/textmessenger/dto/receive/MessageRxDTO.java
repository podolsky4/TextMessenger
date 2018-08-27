package com.textmessenger.dto.receive;

import lombok.Data;

@Data
public class MessageRxDTO {

  private long id;

  private String content;

  private DialogRxDTO dialog;

  private UserRxDTO user;
}
