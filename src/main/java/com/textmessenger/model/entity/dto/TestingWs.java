package com.textmessenger.model.entity.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TestingWs {
  private String sender;
  private String receiver;
  private MessageToFront messageToFront;

}
