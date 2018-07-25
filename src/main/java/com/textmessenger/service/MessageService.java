package com.textmessenger.service;

import com.textmessenger.model.Dialog;
import com.textmessenger.model.Message;

import java.util.List;

public interface MessageService {

  long createMessage(Message message);

  Message readMessage(long id);

  void updateMessage(Message oldMessage, Message message);

  void deleteMessage(Message message);

  List<Message> getMessagesFromDialog(Dialog dialog);
}
