package com.text_messenger.controller;

import com.text_messenger.service.UserSerivce;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

  @Autowired
  private UserSerivce userSerivce;


}
