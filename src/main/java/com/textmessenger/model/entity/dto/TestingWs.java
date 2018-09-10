package com.textmessenger.model.entity.dto;

import lombok.Data;

@Data
public class TestingWs {
  private String sender;
  private String receiver;
  private String type;
  private MessageToFront messageToFront;
  private DialogToFront dialogToFront;

}
