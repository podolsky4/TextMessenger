package com.textmessenger.service;

import com.textmessenger.model.entity.WebSocketType;
import com.textmessenger.model.entity.Dialog;
import com.textmessenger.model.entity.User;
import com.textmessenger.model.entity.dto.DialogToFront;
import com.textmessenger.repository.DialogRepository;
import com.textmessenger.repository.UserRepository;
import com.textmessenger.security.UserPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
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
    List<User> users = dialog.getUsers();
    users.add(firstUser);
    users.add(secondUser);
    dialog.setUsers(users);
    Dialog save = dialogRepository.save(dialog);
    firstUser.getDialogs().add(save);
    secondUser.getDialogs().add(save);
    save.getUsers().forEach(toUser -> {
      if (toUser.getId() != firstUser.getId()) {
        notificationService.createSome(WebSocketType.NEW_DIALOG.toString(), toUser, firstUser, save);
      }
    });
  }

  @Override
  public void addToDialogNewUser(Long dialog, Long user) {
    UserPrincipal userPrincipal = (UserPrincipal) SecurityContextHolder
            .getContext()
            .getAuthentication()
            .getPrincipal();
    User mainUser = userRepository.getOne(userPrincipal.getId());
    User one = userRepository.getOne(user);
    Dialog save = dialogRepository.getOne(dialog);
    one.getDialogs().add(save);
    notificationService.createSome(WebSocketType.ADD_TO_DIALOG.toString(), one, mainUser, save);
  }
}
