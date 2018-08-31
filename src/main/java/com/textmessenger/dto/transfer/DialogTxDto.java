package com.textmessenger.dto.transfer;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class DialogTxDto {

  private long id;

  private List<MessageTxDto> messages = new ArrayList<>();

  private List<UserTxDto> users = new ArrayList<>();

}
