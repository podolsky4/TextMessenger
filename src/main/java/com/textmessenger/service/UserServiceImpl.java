package com.textmessenger.service;

import com.textmessenger.model.User;
import com.textmessenger.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class UserServiceImpl implements UserService{

  private final UserRepository userRepository;

  @Autowired
  public UserServiceImpl(UserRepository userRepository) {
    this.userRepository = userRepository;
  }


  @Override
  public long createUser(User user) {
    return 0;
  }

  @Override
  public User readUser(long id) {
    return userRepository.findById(id).get();
  }

  @Override
  public void updateUser(long id, User user) {

  }

  @Override
  public void deleteUser(long id) {

  }

}
