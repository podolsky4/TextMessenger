package com.textmessenger.model.entity.dto;

import com.textmessenger.model.entity.Message;
import com.textmessenger.model.entity.User;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
public class MessageToFront {
  private long id;
  private String content;
  private long dialog;
  private UserToFrontShort user;
  private LocalDateTime createdDate;

  public static MessageToFront convertMessageToFront(Message message) {
    MessageToFront messageToFront = new MessageToFront();
    messageToFront.setId(message.getId());
    messageToFront.setContent(message.getContent());
    messageToFront.setUser(UserToFrontShort.convertUserForFront(message.getUser()));
    messageToFront.setDialog(message.getDialog().getId());
    messageToFront.setCreatedDate(message.getCreatedDate());
    return messageToFront;
  }
  public static List<MessageToFront> convertMessagesListToResponse(List<Message> messageList) {
    List<MessageToFront> res = new ArrayList<>();
    messageList.stream().forEach(message -> res.add(convertMessageToFront(message)));
    return res;
  }
}
