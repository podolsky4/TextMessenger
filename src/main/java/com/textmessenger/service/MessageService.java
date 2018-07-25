package com.textmessenger.service;

import com.textmessenger.model.Dialog;
import com.textmessenger.model.Message;

import java.util.List;

public interface MessageService {

  long createMessage(Message message);

  Message readMessage(long id);

  void updateMessage(long id, Message message);

  void deleteMessage(long id);

  List<Message> getMessagesFromDialog(Dialog dialog);
}
