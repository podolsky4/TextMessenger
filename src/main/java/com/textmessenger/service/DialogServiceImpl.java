package com.textmessenger.service;

import com.textmessenger.constant.NotificationType;
import com.textmessenger.constant.WebSocketType;
import com.textmessenger.model.entity.Dialog;
import com.textmessenger.model.entity.User;
import com.textmessenger.model.entity.dto.DialogToFront;
import com.textmessenger.model.entity.dto.WebSocketMessage;
import com.textmessenger.repository.DialogRepository;
import com.textmessenger.repository.UserRepository;
import com.textmessenger.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.messaging.simp.SimpMessagingTemplate;
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
  private SimpMessagingTemplate simpMessagingTemplate;
  @Value("${ws.path}")
  private String path;

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
        simpMessagingTemplate.convertAndSendToUser(user1.getLogin(), path, setField(firstUser.getLogin(),
                user1.getLogin(), save, WebSocketType.NEW_DIALOG.toString()));
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
    notificationService.createNotification(NotificationType.DIALOG.toString(), one, mainUser, save.getId());
  }

  public static WebSocketMessage setField(String senderLogin, String receiverLogin, Dialog dialog, String type) {
    WebSocketMessage testingWs = new WebSocketMessage();
    testingWs.setType(type);
    testingWs.setSender(senderLogin);
    testingWs.setReceiver(receiverLogin);
    testingWs.setDialogToFront(DialogToFront.convertDialogToFront(dialog));
    return testingWs;
  }
}
