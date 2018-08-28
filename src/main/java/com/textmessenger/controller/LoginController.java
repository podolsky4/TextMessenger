package com.textmessenger.controller;

import com.textmessenger.model.entity.dto.LoginRq;
import com.textmessenger.service.LoginService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/api")
public class LoginController {
  private LoginService loginService;

  public LoginController(LoginService loginService){
    this.loginService = loginService;
  }

  @PostMapping("/login")
  public ResponseEntity authenticateUser(@Valid @RequestBody LoginRq user){
    return loginService.authenticateUser(user);
  }
}
