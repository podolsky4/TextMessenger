package com.textmessenger.repository;

import com.textmessenger.model.entity.User;
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
public class UserRepositoryTest {

  @Autowired
  private UserRepository userRepository;
  @Autowired
  private TestEntityManager entityManager;

  @Test
  public void findAllUser() {
    List<User> all = userRepository.findAll();
    assertThat(all).hasSize(6);
  }

  @Test
  public void findUserByLogin() {
    User user = new User();
    user.setLogin("junit");
    user.setEmail("junit@gmail.com");
    user.setPassword("123456");
    entityManager.persist(user);
    User junit = userRepository.findUserByLogin("junit");
    assertThat(user.equals(junit));
  }
}