package com.textmessenger.service;

import com.textmessenger.model.Dialog;
import com.textmessenger.model.Message;
import com.textmessenger.repository.MessageRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

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
  public void updateMessage(long id, Message message) {
    Message existing = messageRepository.getOne(id);

    message.setId(existing.getId());

    messageRepository.save(message);
  }

  @Override
  public void deleteMessage(long id) {
    messageRepository.delete(messageRepository.getOne(id));
  }

  @Override
  public List<Message> getMessagesFromDialog(Dialog dialog) {
    return messageRepository.findAll().stream().filter(e -> e.getDialog().equals(dialog)).collect(Collectors.toList());
  }
}

