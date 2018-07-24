package com.textmessenger.service;

import com.textmessenger.model.Dialog;

public interface DialogService {

  long createDialog(Dialog dialog);

  Dialog readDialog(long id);

  void updateDialog(long id, Dialog dialog);

  void deleteDialog(long id);
}
