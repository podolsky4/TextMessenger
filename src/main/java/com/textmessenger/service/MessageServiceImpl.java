package com.textmessenger.service;

import com.textmessenger.constant.NotificationType;
import com.textmessenger.dto.receive.DialogRxDto;
import com.textmessenger.dto.receive.MessageRxDto;
import com.textmessenger.dto.transfer.MessageTxDto;
import com.textmessenger.mapper.DialogMapper;
import com.textmessenger.mapper.MessageMapper;
import com.textmessenger.mapper.UserMapper;
import com.textmessenger.model.entity.Dialog;
import com.textmessenger.model.entity.Message;
import com.textmessenger.model.entity.User;
import com.textmessenger.model.entity.dto.MessageToFront;
import com.textmessenger.repository.DialogRepository;
import com.textmessenger.repository.MessageRepository;
import com.textmessenger.repository.UserRepository;
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
  private final MessageMapper messageMapper;
  private final UserMapper userMapper;
  private final DialogMapper dialogMapper;

  public MessageServiceImpl(MessageRepository messageRepository,
                            DialogRepository dialogRepository,
                            UserRepository userRepository,
                            NotificationService notificationService,
                            MessageMapper messageMapper,
                            UserMapper userMapper,
                            DialogMapper dialogMapper) {

    this.messageRepository = messageRepository;
    this.dialogRepository = dialogRepository;
    this.userRepository = userRepository;
    this.notificationService = notificationService;
    this.messageMapper = messageMapper;
    this.userMapper = userMapper;
    this.dialogMapper = dialogMapper;
  }

  @Override
  public void createMessage(MessageRxDto message) {
    Message save = messageRepository.save(messageMapper.messRxDtoToMess(message));
    User user = save.getUser();
    save.getDialog().getUsers().forEach(u -> {
      if (u.getId() != user.getId()) {
        notificationService.createNotification(NotificationType.MESSAGE.toString(), userMapper.userToRxDto(u), save.getId());
      }
    });
  }

  @Override
  public void updateMessage(MessageRxDto message) {
    messageRepository.save(messageMapper.messRxDtoToMess(message));
  }

  @Override
  public void deleteMessage(MessageRxDto message) {
    messageRepository.deleteById(messageMapper.messRxDtoToMess(message));
  }

  @Override
  public List<MessageToFront> getMessagesFromDialog(Dialog dialog) {
    //return messageRepository.findByDialog(dialog);
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
    messageRepository.save(message);
  }
}

