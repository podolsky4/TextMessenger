package com.text_messenger.service;

import com.text_messenger.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserServiceJPA implements UserSerivce {

  private UserRepository userRepository;

  public UserServiceJPA(UserRepository userRepository) {
    this.userRepository = userRepository;
  }
}
