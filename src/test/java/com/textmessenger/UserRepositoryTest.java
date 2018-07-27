package com.textmessenger;

import com.textmessenger.model.entity.User;
import com.textmessenger.repository.UserRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;

import static org.assertj.core.api.Assertions.assertThat;


@RunWith(SpringRunner.class)
@DataJpaTest
public class UserRepositoryTest {

  @Autowired
  private TestEntityManager entityManager;

  @Autowired
  private UserRepository userRepository;

  private User alex;

  public UserRepositoryTest() {
    // given user
    alex = new User();
    alex.setLogin("alex007");
    alex.setEmail("alex.retina@gmail.com");
    alex.setPassword("Asd17357coding_is_fun");
  }

  // Set up here
  @Before
  public void setUp() {
    entityManager.persist(alex);
    entityManager.flush();
  }

  // write test cases here
  @Test
  public void shouldFindUserByLogin() {

    // when found
    User found = userRepository.findUserByLogin(alex.getLogin());

    // then check login field
    assertThat(found.getLogin()).isEqualTo(alex.getLogin());
  }

  @Test
  public void shouldFindUserByEmail() {

    // when found
    User found = userRepository.findUserByEmail(alex.getEmail());

    // then check login field
    assertThat(found.getEmail()).isEqualTo(alex.getEmail());
  }

}
