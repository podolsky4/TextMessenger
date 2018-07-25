package com.textmessenger.service;

import com.textmessenger.model.Dialog;
import com.textmessenger.model.Message;
import com.textmessenger.repository.MessageRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class MessageServiceImpl implements MessageService {

  private final MessageRepository messageRepository;

  public MessageServiceImpl(MessageRepository messageRepository) {
    this.messageRepository = messageRepository;
  }

  @Override
  public long createMessage(Message message) {
    return messageRepository.save(message).getId();
  }

  @Override
  public Message readMessage(long id) {
    return messageRepository.getOne(id);
  }

  @Override
  public void updateMessage(Message oldMessage, Message message) {
    messageRepository.updateMessageByNewMwssage(oldMessage, message);
  }

  @Override
  public void deleteMessage(Message message) {
    messageRepository.deleteMessageById(message);
  }

  @Override
  public List<Message> getMessagesFromDialog(Dialog dialog) {
    return messageRepository.getAllMessagesByDialog(dialog);
  }
}

