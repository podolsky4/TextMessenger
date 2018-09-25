package com.textmessenger.repository;

import com.textmessenger.model.entity.Message;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@DataJpaTest
public class MessageRepositoryTest {

  @Autowired
  private MessageRepository messageRepository;

  @Autowired
  private TestEntityManager entityManager;

  @Test
  public void findAllMessages() {
    List<Message> all = messageRepository.findAll();
    int allMessages = all.size();
    assertThat(all).hasSize(allMessages);
  }

  public Message setMessage() {
    Message message = new Message();
    message.setContent("message");
    return entityManager.persist(message);
  }
}
