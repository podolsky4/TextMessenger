package com.textmessenger.model.entity.dto;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(JUnit4.class)
public class WebSocketMessageTest {

  private WebSocketMessage webSocketMessage;

  @Test
  public void shouldBeTest() {
    webSocketMessage = new WebSocketMessage();
    String sender = "sender";
    String receiver = "receiver";
    String type = "type";
    webSocketMessage.setSender(sender);
    webSocketMessage.setReceiver(receiver);
    webSocketMessage.setType(type);
    assertThat(sender.equals(webSocketMessage.getSender()));
    assertThat(receiver.equals(webSocketMessage.getReceiver()));
    assertThat(type.equals(webSocketMessage.getType()));
  }
}
