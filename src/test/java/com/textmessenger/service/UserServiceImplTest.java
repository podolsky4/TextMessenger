package com.textmessenger.service;

import com.textmessenger.model.entity.User;
import com.textmessenger.repository.UserRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class UserServiceImplTest {

  @Mock
  private UserRepository userRepository;

  @InjectMocks
  private UserServiceImpl userService;

  @Test
  public void createUserTest() {
    User user = setTestUser();
    when(userRepository.save(user)).thenReturn(user);
    assertEquals(user, userService.createUser(user));
  }

  public User setTestUser() {
    User user = new User();
    user.setId(1L);
    user.setLogin("junit");
    user.setEmail("junit@gmail.com");
    user.setPassword("123456");
    return user;
  }
}
