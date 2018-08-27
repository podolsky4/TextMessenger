package com.textmessenger.dto.receive;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class DialogRxDTO {

  private long id;

  private List<MessageRxDTO> messages = new ArrayList<>();

  private List<UserRxDTO> users = new ArrayList<>();
}
