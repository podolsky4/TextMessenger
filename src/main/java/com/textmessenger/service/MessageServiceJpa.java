package com.textmessenger.service;

import com.textmessenger.model.Message;
import com.textmessenger.repository.MessageRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class MessageServiceJpa implements MessageService {

  private final MessageRepository messageRepository;

  public MessageServiceJpa(MessageRepository messageRepository) {
    this.messageRepository = messageRepository;
  }

  @Override
  @Transactional
  public long createMessage(Message message) {
    return messageRepository.save(message).getId();
  }

  @Override
  public Message readMessage(long id) {
    return messageRepository.getOne(id);
  }

  @Override
  @Transactional
  public void updateMessage(long id, Message message) {
    Message existing = messageRepository.getOne(id);

    message.setId(existing.getId());

    messageRepository.save(message);
  }

  @Override
  @Transactional
  public void deleteMessage(long id) {
    messageRepository.delete(messageRepository.getOne(id));
  }
}

