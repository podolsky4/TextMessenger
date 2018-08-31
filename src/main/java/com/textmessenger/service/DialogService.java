package com.textmessenger.service;

import com.textmessenger.dto.receive.DialogRxDTO;
import com.textmessenger.dto.receive.UserRxDTO;
import com.textmessenger.dto.transfer.DialogTxDTO;
import java.util.List;

public interface DialogService {

  void createDialog(DialogRxDTO dialog);

  List<DialogTxDTO> getDialogsByUser(UserRxDTO user);

  void updateDialog(DialogRxDTO dialog);

  void deleteDialog(long id);

  void createdByUserDialogWithUser(String login, Long user);

  void addToDialogNewUser(Long dialog, Long user);
}
