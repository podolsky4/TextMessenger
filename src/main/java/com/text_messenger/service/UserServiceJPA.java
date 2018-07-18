package com.text_messenger.service;

import com.text_messenger.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceJPA implements UserSerivce {

  @Autowired
  private UserRepository userRepository;


}
