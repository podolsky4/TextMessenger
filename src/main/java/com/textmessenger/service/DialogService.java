package com.textmessenger.service;

import com.textmessenger.model.entity.Dialog;
import com.textmessenger.model.entity.User;

import java.util.List;

public interface DialogService {

  void createDialog(Dialog dialog);

  List<Dialog> getDialogsByUser(User user);

  void updateDialog(Dialog dialog);

  void deleteDialog(long id);
}
