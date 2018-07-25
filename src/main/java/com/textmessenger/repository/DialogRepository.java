package com.textmessenger.repository;

import com.textmessenger.model.Dialog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DialogRepository extends JpaRepository<Dialog, Long> {
  void updateOldDialogByNewDialog(Dialog oldDialog, Dialog newDialog);
}
