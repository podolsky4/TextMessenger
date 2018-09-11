package com.textmessenger.service;


import com.textmessenger.constant.WebSocketType;
import com.textmessenger.model.entity.Notification;
import com.textmessenger.model.entity.Post;
import com.textmessenger.model.entity.User;
import com.textmessenger.model.entity.dto.PostToFront;
import com.textmessenger.model.entity.dto.WebSocketMessage;
import com.textmessenger.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import static com.textmessenger.service.PostServiceImpl.setField;

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
  public Notification createNotification(String type, User toUser, User fromUser, Long contentId) {
    return notificationRepository.save(new Notification(false, contentId, type, toUser, fromUser));
  }

  @Override
  public void createSome(String type, User toUser, User fromUser, Post post) {
    notificationRepository.save(new Notification(false,post.getId(),type,toUser,fromUser));
    WebSocketMessage webSocketMessage = setField(fromUser.getLogin(),
            toUser.getLogin(), WebSocketType.NEW_POST.toString());
    webSocketMessage.setPostToFront(PostToFront.convertPostToFront(post));
    simpMessagingTemplate.convertAndSendToUser(toUser.getLogin(), path,webSocketMessage);
  }

  public static WebSocketMessage setField(String senderLogin, String receiverLogin, String type) {
    WebSocketMessage testingWs = new WebSocketMessage();
    testingWs.setType(type);
    testingWs.setSender(senderLogin);
    testingWs.setReceiver(receiverLogin);
    return testingWs;
  }
}
