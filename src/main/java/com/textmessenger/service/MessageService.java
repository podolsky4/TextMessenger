package com.textmessenger.service;

import com.textmessenger.model.entity.Dialog;
import com.textmessenger.model.entity.Message;

import java.util.List;

public interface MessageService {

  void createMessage(Message message);

  void updateMessage(Message message);

  void deleteMessage(Message message);

  List<Message> getMessagesFromDialog(Dialog dialog);
}
