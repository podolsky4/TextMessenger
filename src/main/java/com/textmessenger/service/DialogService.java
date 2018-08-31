package com.textmessenger.service;

import com.textmessenger.dto.receive.DialogRxDto;
import com.textmessenger.dto.receive.UserRxDto;
import com.textmessenger.dto.transfer.DialogTxDto;
import java.util.List;

public interface DialogService {

  void createDialog(DialogRxDto dialog);

  List<DialogTxDto> getDialogsByUser(UserRxDto user);

  void updateDialog(DialogRxDto dialog);

  void deleteDialog(long id);

  void createdByUserDialogWithUser(String login, Long user);

  void addToDialogNewUser(Long dialog, Long user);
}
