package com.textmessenger.service;

import com.textmessenger.constant.WebSocketType;
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

    public MessageServiceImpl(MessageRepository messageRepository,
                              DialogRepository dialogRepository,
                              UserRepository userRepository,
                              NotificationService notificationService) {

        this.messageRepository = messageRepository;
        this.dialogRepository = dialogRepository;
        this.userRepository = userRepository;
        this.notificationService = notificationService;
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
        User fromUser = userRepository.getOne(user);
        Dialog userD = dialogRepository.getOne(dialog);
        Message message = new Message();
        message.setContent(msg);
        message.setDialog(userD);
        message.setUser(fromUser);
        Message save = messageRepository.save(message);
        userD.getUsers().forEach(toUser -> {
            if (toUser.getId() != fromUser.getId()) {
                notificationService.createSome(WebSocketType.NEW_MESSAGE.toString(), toUser, fromUser, save.getDialog());
            }
        });
    }
}

