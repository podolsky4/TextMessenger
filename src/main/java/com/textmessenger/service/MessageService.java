package com.textmessenger.service;

import com.textmessenger.dto.receive.DialogRxDto;
import com.textmessenger.dto.receive.MessageRxDto;
import com.textmessenger.dto.transfer.MessageTxDto;
import java.util.List;

public interface MessageService {

  void createMessage(MessageRxDto message);

  void updateMessage(MessageRxDto message);

  void deleteMessage(MessageRxDto message);

  List<MessageTxDto> getMessagesFromDialog(DialogRxDto dialog);

  void createMessageWithUserIdDialogId(Long user, Long dialog, String msg);
}
