package com.textmessenger.utils;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordEncoder {
  public static void main(String[] args) {

    String [] password = {"sarah","johny","samurai","alex007","amilyUta"};
    String [] hashedPassword = new String[password.length];
    BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    for (int i = 0; i < password.length; i++) {
      hashedPassword[i] = passwordEncoder.encode(password[i]);
    }
    for (String s : hashedPassword) {
      System.out.println(s);
    }
  }
}
