package com.textmessenger.model.entity.dto;

import lombok.Data;

@Data
public class WebSocketMessage {
  private String sender;//NOSONAR
  private String receiver;//NOSONAR
  private String type;//NOSONAR
  private MessageToFront messageToFront;//NOSONAR
  private DialogToFront dialogToFront;//NOSONAR
  private CommentToFront commentToFront; //NOSONAR
  private PostToFront postToFront; //NOSONAR

}
