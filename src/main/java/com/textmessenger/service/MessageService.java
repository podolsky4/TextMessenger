package com.textmessenger.service;

import com.textmessenger.model.Dialog;
import com.textmessenger.model.Message;

import java.util.List;
import java.util.Optional;

public interface MessageService {

  void createMessage(Message message);

  void updateMessage(Message message);

  void deleteMessage(Message message);

  List<Message> getMessagesFromDialog(Dialog dialog);
}
