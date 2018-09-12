package com.textmessenger.service;

import com.textmessenger.model.entity.dto.LoginRq;
import org.springframework.http.ResponseEntity;

public interface LoginService {
  ResponseEntity authenticateUser(LoginRq user);
}
