package com.textmessenger.service;

import com.textmessenger.model.Dialog;

public interface DialogService {

  void createDialog(Dialog dialog);

  Dialog readDialog(long id);

  void updateDialog(Dialog dialog);

  void deleteDialog(long id);
}
