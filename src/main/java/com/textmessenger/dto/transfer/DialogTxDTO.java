package com.textmessenger.dto.transfer;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class DialogTxDTO {

  private long id;

  private List<MessageTxDTO> messages = new ArrayList<>();

  private List<UserTxDTO> users = new ArrayList<>();
}
