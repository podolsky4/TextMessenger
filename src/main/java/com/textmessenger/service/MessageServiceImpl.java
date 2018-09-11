package com.textmessenger.service;

import com.textmessenger.constant.NotificationType;
import com.textmessenger.constant.WebSocketType;
import com.textmessenger.model.entity.Dialog;
import com.textmessenger.model.entity.Message;
import com.textmessenger.model.entity.User;
import com.textmessenger.model.entity.dto.MessageToFront;
import com.textmessenger.model.entity.dto.WebSocketMessage;
import com.textmessenger.repository.DialogRepository;
import com.textmessenger.repository.MessageRepository;
import com.textmessenger.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class MessageServiceImpl implements MessageService {

  private final MessageRepository messageRepository;
  private final UserRepository userRepository;
  private final DialogRepository dialogRepository;
  private final NotificationService notificationService;
  private SimpMessagingTemplate simpMessagingTemplate;
  @Value("${ws.path}")
  private String path;

  public MessageServiceImpl(MessageRepository messageRepository,
                            DialogRepository dialogRepository,
                            UserRepository userRepository,
                            NotificationService notificationService,
                            SimpMessagingTemplate simpMessagingTemplate
  ) {

    this.messageRepository = messageRepository;
    this.dialogRepository = dialogRepository;
    this.userRepository = userRepository;
    this.notificationService = notificationService;
    this.simpMessagingTemplate = simpMessagingTemplate;
  }

  @Override
  public void createMessage(Message message) {
    Message save = messageRepository.save(message);
    User user = save.getUser();
    save.getDialog().getUsers().forEach(u -> {
      if (u.getId() != user.getId()) {
        notificationService.createNotification(NotificationType.MESSAGE.toString(), u,user, save.getId());
      }
    });
  }

  @Override
  public void updateMessage(Message message) {
    messageRepository.save(message);
  }

  @Override
  public void deleteMessage(Message message) {
    messageRepository.deleteById(message);
  }

  @Override
  public List<MessageToFront> getMessagesFromDialog(Dialog dialog) {
    return MessageToFront.convertMessagesListToResponse(messageRepository.findByDialog(dialog));
  }

  @Override
  public void createMessageWithUserIdDialogId(Long user, Long dialog, String msg) {
    User userM = userRepository.getOne(user);
    Dialog userD = dialogRepository.getOne(dialog);
    Message message = new Message();
    message.setContent(msg);
    message.setDialog(userD);
    message.setUser(userM);
    Message save = messageRepository.save(message);
    userD.getUsers().forEach(user1 -> {
      if (user1.getId() != userM.getId()) {
        simpMessagingTemplate.convertAndSendToUser(user1.getLogin(),
                path,
                setField(userM.getLogin(),
                        user1.getLogin(),
                        save,
                        WebSocketType.NEW_MESSAGE.toString()));
      }
    });
  }

  public static WebSocketMessage setField(String senderLogin, String receiverLogin, Message message, String type) {
    WebSocketMessage testingWs = new WebSocketMessage();
    testingWs.setType(type);
    testingWs.setSender(senderLogin);
    testingWs.setReceiver(receiverLogin);
    testingWs.setMessageToFront(MessageToFront.convertMessageToFront(message));
    return testingWs;
  }
}

