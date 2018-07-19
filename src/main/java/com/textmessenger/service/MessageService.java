package com.textmessenger.service;

import com.textmessenger.model.Message;

public interface MessageService {

  long createMessage(Message message);

  Message readMessage(long id);

  void updateMessage(long id, Message message);

  void deleteMessage(long id);

}
