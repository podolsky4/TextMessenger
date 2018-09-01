package com.textmessenger.service;

import com.textmessenger.constant.NotificationType;
import com.textmessenger.model.entity.Dialog;
import com.textmessenger.model.entity.User;
import com.textmessenger.model.entity.dto.DialogToFront;
import com.textmessenger.repository.DialogRepository;
import com.textmessenger.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class DialogServiceImpl implements DialogService {

  private final DialogRepository dialogRepository;
  private final UserRepository userRepository;
  private final NotificationService notificationService;

  public DialogServiceImpl(DialogRepository dialogRepository, UserRepository userRepository,
                           NotificationService notificationService) {
    this.dialogRepository = dialogRepository;
    this.userRepository = userRepository;
    this.notificationService = notificationService;
  }

  @Override
  public void createDialog(Dialog dialog) {
    dialogRepository.save(dialog);
  }

  public List<DialogToFront> getDialogsByUser(User user) {
    return DialogToFront.convertDialogsListToResponse(dialogRepository.findDialogsByUsers(user));
  }

  @Override
  public void updateDialog(Dialog dialog) {
    dialogRepository.save(dialog);
  }

  @Override
  public void deleteDialog(long id) {
    dialogRepository.delete(dialogRepository.getOne(id));
  }

  @Override
  public void createdByUserDialogWithUser(String login, Long user) {
    User firstUser = userRepository.findUserByLogin(login);
    User secondUser = userRepository.getOne(user);
    Dialog dialog = new Dialog();
    Dialog save = dialogRepository.save(dialog);
    firstUser.getDialogs().add(save);
    secondUser.getDialogs().add(save);
    notificationService.createNotification(NotificationType.DIALOG.toString(), firstUser, save.getId());
  }

  @Override
  public void addToDialogNewUser(Long dialog, Long user) {
    User one = userRepository.getOne(user);
    Dialog save = dialogRepository.getOne(dialog);
    one.getDialogs().add(save);
    notificationService.createNotification(NotificationType.DIALOG.toString(), one, save.getId());
  }
}
