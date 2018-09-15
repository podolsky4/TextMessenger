package com.textmessenger.model.entity.dto;

import lombok.Data;

@Data
public class ResponseToFront {
  private String message;

  public static ResponseToFront convertResponseToFront(String msg) {
    ResponseToFront responseToFront = new ResponseToFront();
    responseToFront.setMessage(msg);
    return responseToFront;
  }
}
