package com.textmessenger.service;

import com.textmessenger.dto.transfer.MessageTxDTO;
import com.textmessenger.model.entity.Dialog;
import com.textmessenger.model.entity.Message;

import java.util.List;

public interface MessageService {

  void createMessage(Message message);

  void updateMessage(Message message);

  void deleteMessage(Message message);

  List<MessageTxDTO> getMessagesFromDialog(Dialog dialog);

  void createMessageWithUserIdDialogId(Long user, Long dialog, String msg);
}
