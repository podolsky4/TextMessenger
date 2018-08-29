package com.textmessenger.service;

import com.textmessenger.dto.receive.DialogRxDTO;
import com.textmessenger.dto.receive.MessageRxDTO;
import com.textmessenger.dto.transfer.MessageTxDTO;
import java.util.List;

public interface MessageService {

  void createMessage(MessageRxDTO message);

  void updateMessage(MessageRxDTO message);

  void deleteMessage(MessageRxDTO message);

  List<MessageTxDTO> getMessagesFromDialog(DialogRxDTO dialog);

  void createMessageWithUserIdDialogId(Long user, Long dialog, String msg);
}
