package com.textmessenger.repository;

import com.textmessenger.model.entity.User;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;
import java.util.Optional;

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
    User user = setUser();
    User junit = userRepository.findUserByLogin("junit");
    assertThat(user.equals(junit));
  }

  @Test
  public void findUserByEmail() {
    User user = setUser();
    User junit = userRepository.findUserByEmail("junit@gmail.com");
    assertThat(user.equals(junit));
  }

  @Test
  public void findUserByEmailOrLogin() {
    User user = setUser();
    Optional<User> byLoginOrEmail = userRepository.findByLoginOrEmail("junit", "junit");
    assertThat(user.equals(byLoginOrEmail.get()));
  }

  @Test
  public void findUserByEmailOrLoginSearch() {
    User user = setUser();
    List<User> byLoginOrEmail = userRepository.findByEmailContainingIgnoreCaseOrLoginContainingIgnoreCase("junit", "junit");
    assertThat(user.equals(byLoginOrEmail.get(0)));
  }

  public User setUser() {
    User user = new User();
    user.setLogin("junit");
    user.setEmail("junit@gmail.com");
    user.setPassword("123456");
    return entityManager.persist(user);
  }
}