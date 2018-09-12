package com.textmessenger.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class ResetPasswordController {

  @GetMapping("/api/users/resetPassword/{token}")
  public String reset (@PathVariable String token){
    System.out.println("Resetting password");
    return "redirect:http://localhost:3000/resetPassword?token=" + token;
  }
}
