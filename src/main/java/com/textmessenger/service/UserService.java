package com.textmessenger.service;

import com.textmessenger.model.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
  List<User> findAll();
  Optional<User> findById(long id);
}
