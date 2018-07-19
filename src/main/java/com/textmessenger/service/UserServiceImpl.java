package com.textmessenger.service;

import com.textmessenger.model.User;
import com.textmessenger.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService{

  private final UserRepository userRepository;

  @Autowired
  public UserServiceImpl(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  public List<User> findAll() {
    return userRepository.findAll();
  }

  @Override
  public Optional<User> findById(long id) {
    return userRepository.findById(id);
  }
}
