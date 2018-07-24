package com.textmessenger.service;

import com.textmessenger.model.Dialog;
import com.textmessenger.repository.DialogRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class DialogServiceImpl implements DialogService {

  private final DialogRepository dialogRepository;

  public DialogServiceImpl(DialogRepository dialogRepository) {
    this.dialogRepository = dialogRepository;
  }

  @Override
  public long createDialog(Dialog dialog) {
    return dialogRepository.save(dialog).getId();
  }

  @Override
  public Dialog readDialog(long id) {
    return dialogRepository.getOne(id);
  }

  @Override
  public void updateDialog(long id, Dialog dialog) {
    Dialog existing = dialogRepository.getOne(id);

    dialog.setId(existing.getId());

    dialogRepository.save(dialog);
  }

  @Override
  public void deleteDialog(long id) {
    dialogRepository.delete(dialogRepository.getOne(id));
  }
}
