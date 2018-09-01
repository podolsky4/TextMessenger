package com.textmessenger.dto.transfer;

import lombok.Data;

@Data
public class MessageTxDto {

  private long id;

  private String content;

  private DialogTxDto dialog;

  private UserTxDto user;

}
