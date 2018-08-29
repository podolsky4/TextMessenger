package com.textmessenger.service;

import com.textmessenger.constant.NotificationType;
import com.textmessenger.dto.receive.DialogRxDTO;
import com.textmessenger.dto.receive.MessageRxDTO;
import com.textmessenger.dto.transfer.MessageTxDTO;
import com.textmessenger.mapper.MessageMapper;
import com.textmessenger.model.entity.Dialog;
import com.textmessenger.model.entity.Message;
import com.textmessenger.model.entity.User;
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

  public MessageServiceImpl(MessageRepository messageRepository,
                            DialogRepository dialogRepository,
                            UserRepository userRepository,
                            NotificationService notificationService,
                            MessageMapper messageMapper) {

    this.messageRepository = messageRepository;
    this.dialogRepository = dialogRepository;
    this.userRepository = userRepository;
    this.notificationService = notificationService;
    this.messageMapper = messageMapper;
  }

  @Override
  public void createMessage(MessageRxDTO message) {
    Message save = messageRepository.save(message);
    User user = save.getUser();
    save.getDialog().getUsers().forEach(u -> {
      if (u.getId() != user.getId()) {
        notificationService.createNotification(NotificationType.MESSAGE.toString(), u, save.getId());
      }
    });
  }

  @Override
  public void updateMessage(MessageRxDTO message) {
    messageRepository.save(message);
  }

  @Override
  public void deleteMessage(MessageRxDTO message) {
    messageRepository.deleteById(message);
  }

  @Override
  public List<MessageTxDTO> getMessagesFromDialog(DialogRxDTO dialog) {
    return messageMapper.messsToMessTxDtos(messageRepository.findByDialog(dialog));
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

