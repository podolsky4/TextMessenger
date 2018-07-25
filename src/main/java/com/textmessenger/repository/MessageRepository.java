package com.textmessenger.repository;

import com.textmessenger.model.Dialog;
import com.textmessenger.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {

  List<Message> getAllMessagesByDialog(Dialog dialog);

  void deleteMessageById(Message message);

  void updateMessageByNewMwssage(Message oldMessage, Message newMessage);
}
