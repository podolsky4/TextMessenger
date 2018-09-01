package com.textmessenger.service;

import com.textmessenger.model.entity.Dialog;
import com.textmessenger.model.entity.User;
import com.textmessenger.model.entity.dto.DialogToFront;

import java.util.List;

public interface DialogService {

  void createDialog(Dialog dialog);

  List<DialogToFront> getDialogsByUser(User user);

  void updateDialog(Dialog dialog);

  void deleteDialog(long id);

  void createdByUserDialogWithUser(String login, Long user);

  void addToDialogNewUser(Long dialog, Long user);
}
