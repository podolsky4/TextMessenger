package com.textmessenger.service;

import com.textmessenger.model.entity.Dialog;
import com.textmessenger.model.entity.Message;
import com.textmessenger.model.entity.dto.MessageToFront;

import java.util.List;

public interface MessageService {

  void updateMessage(Message message);

  void deleteMessage(Message message);

  List<MessageToFront> getMessagesFromDialog(Dialog dialog);

  void createMessageWithUserIdDialogId(Long user, Long dialog, String msg);
}
