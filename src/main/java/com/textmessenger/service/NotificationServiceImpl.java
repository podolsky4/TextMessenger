package com.textmessenger.service;

import com.textmessenger.model.entity.Dialog;
import com.textmessenger.model.entity.Notification;
import com.textmessenger.model.entity.Post;
import com.textmessenger.model.entity.User;
import com.textmessenger.model.entity.WebSocketType;
import com.textmessenger.model.entity.dto.DialogToFront;
import com.textmessenger.model.entity.dto.MessageToFront;
import com.textmessenger.model.entity.dto.PostToFront;
import com.textmessenger.model.entity.dto.WebSocketMessage;
import com.textmessenger.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationServiceImpl implements NotificationService {
  private final NotificationRepository notificationRepository;
  private SimpMessagingTemplate simpMessagingTemplate;
  @Value("${ws.path}")
  private String path;

  NotificationServiceImpl(NotificationRepository notificationRepository, SimpMessagingTemplate simpMessagingTemplate) {
    this.notificationRepository = notificationRepository;
    this.simpMessagingTemplate = simpMessagingTemplate;
  }

  @Override
  public void createSome(String type, User toUser, User fromUser, Post post) {
    notificationRepository.save(new Notification(false, post.getId(), type, toUser, fromUser));
    WebSocketMessage webSocketMessage = setField(fromUser.getLogin(),
            toUser.getLogin(), type);
    webSocketMessage.setPostToFront(PostToFront.convertPostToFront(post));
    simpMessagingTemplate.convertAndSendToUser(toUser.getLogin(), path, webSocketMessage);
  }

  @Override
  public void createSome(String type, User toUser, User fromUser, Dialog dialog) {
    notificationRepository.save(new Notification(false, dialog.getId(), type, toUser, fromUser));
    WebSocketMessage webSocketMessage = setField(fromUser.getLogin(),
            toUser.getLogin(), type);
    if (!type.equals(WebSocketType.NEW_MESSAGE.toString())) {
      webSocketMessage.setDialogToFront(DialogToFront.convertDialogToFront(dialog));
    } else {
      webSocketMessage.setMessageToFront(MessageToFront
              .convertMessageToFront(dialog.getMessages().get(dialog.getMessages().size() - 1)));
    }
    simpMessagingTemplate.convertAndSendToUser(toUser.getLogin(), path, webSocketMessage);
  }

  @Override
  public void createSome(String type, User toUser, User fromUser) {
    notificationRepository.save(new Notification(false, type, toUser, fromUser));
    simpMessagingTemplate.convertAndSendToUser(toUser.getLogin(), path, setField(fromUser.getLogin(),
            toUser.getLogin(), type));
  }

  @Override
  public void updateNotificationStatus(long id) {
    Notification one = notificationRepository.getOne(id);
    one.setChecked(true);
    notificationRepository.save(one);
  }

  @Override
  public void deleteNotificationById(long id) {
    notificationRepository.deleteById(id);
  }

  @Override
  public void updateAllNotification(User user) {
    List<Notification> allByUserId = notificationRepository.findAllByUserId(user.getId());
    allByUserId.forEach(n -> n.setChecked(true));
    notificationRepository.saveAll(allByUserId);
  }

  public static WebSocketMessage setField(String senderLogin, String receiverLogin, String type) {
    WebSocketMessage testingWs = new WebSocketMessage();
    testingWs.setType(type);
    testingWs.setSender(senderLogin);
    testingWs.setReceiver(receiverLogin);
    return testingWs;
  }
}
