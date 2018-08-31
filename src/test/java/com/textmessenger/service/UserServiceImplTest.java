package com.textmessenger.service;

import com.textmessenger.model.entity.User;
import com.textmessenger.repository.UserRepository;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.Arrays;
import java.util.List;
import java.util.NoSuchElementException;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class UserServiceImplTest {
  @Rule
  public final ExpectedException exception = ExpectedException.none();
  @Mock
  private UserRepository userRepository;

  @InjectMocks
  private UserServiceImpl userService;

  @Test
  public void createUserTest() {
    User user = setTestUser(1L,"test","test@gmail.com","123456");
    when(userRepository.save(user)).thenReturn(user);
    assertEquals(user, userService.createUser(user));
  }

  @Test
  public void readUserByIdIsValidTest() {
    User user = setTestUser(1L,"test","test@gmail.com","123456");
    User user1 = setTestUser(2L,"test","test@gmail.com","123456");
    User user2 = setTestUser(3L,"test","test@gmail.com","123456");
    List<User> result = Arrays.asList(user,user1,user2);
    when(userRepository.getOne(1L)).thenReturn(result.stream().filter(u -> u.getId() == 1L).findFirst().get());
    assertEquals(user, userService.readUser(1L));
  }

  @Test
  public void readUserByIdNotValidTest() {
    when(userRepository.getOne(1L)).thenThrow(new NoSuchElementException());
    exception.expect(NoSuchElementException.class);
    userService.readUser(1L);
  }

  public User setTestUser(Long id, String login, String email, String password) {
    User user = new User();
    user.setId(id);
    user.setLogin(login);
    user.setEmail(email);
    user.setPassword(password);
    return user;
  }
}
