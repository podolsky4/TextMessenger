package com.textmessenger.service;

import com.textmessenger.constant.NotificationType;
import com.textmessenger.constant.WebSocketType;
import com.textmessenger.model.entity.Dialog;
import com.textmessenger.model.entity.User;
import com.textmessenger.model.entity.dto.DialogToFront;
import com.textmessenger.model.entity.dto.WebSocketMessage;
import com.textmessenger.repository.DialogRepository;
import com.textmessenger.repository.UserRepository;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class DialogServiceImpl implements DialogService {

  private final DialogRepository dialogRepository;
  private final UserRepository userRepository;
  private final NotificationService notificationService;
  private SimpMessagingTemplate simpMessagingTemplate;
  private final String wsPath = "/queue/messages"; //NOSONAR

  public DialogServiceImpl(DialogRepository dialogRepository, UserRepository userRepository,
                           NotificationService notificationService, SimpMessagingTemplate simpMessagingTemplate) {
    this.dialogRepository = dialogRepository;
    this.userRepository = userRepository;
    this.notificationService = notificationService;
    this.simpMessagingTemplate = simpMessagingTemplate;
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
    save.getUsers().forEach(user1 -> {
      if (user1.getId() != firstUser.getId()) {
        WebSocketMessage testingWs = new WebSocketMessage();
        testingWs.setSender(firstUser.getLogin());
        testingWs.setReceiver(user1.getLogin());
        testingWs.setType(WebSocketType.NEW_DIALOG.toString());
        testingWs.setDialogToFront(DialogToFront.convertDialogToFront(save));
        simpMessagingTemplate.convertAndSendToUser(user1.getLogin(), wsPath, testingWs);
      }
    });
  }

  @Override
  public void addToDialogNewUser(Long dialog, Long user) {
    User one = userRepository.getOne(user);
    Dialog save = dialogRepository.getOne(dialog);
    one.getDialogs().add(save);
    notificationService.createNotification(NotificationType.DIALOG.toString(), one, save.getId());
  }
}
