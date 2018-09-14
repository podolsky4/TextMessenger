package com.textmessenger.repository;

import com.textmessenger.model.entity.Dialog;
import com.textmessenger.model.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {

  List<Message> findByDialog(Dialog dialog);

  void deleteById(Message message);
}
