package com.textmessenger.dto.transfer;

import lombok.Data;

@Data
public class MessageTxDTO {

  private long id;

  private String content;

  private DialogTxDTO dialog;

  private UserTxDTO user;
}
