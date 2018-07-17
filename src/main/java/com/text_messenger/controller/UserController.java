package com.text_messenger.controller;

import com.text_messenger.service.UserSerivce;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

  private UserSerivce userSerivce;

  public UserController(UserSerivce userSerivce) {
    this.userSerivce = userSerivce;
  }
}
