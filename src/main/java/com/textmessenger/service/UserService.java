package com.textmessenger.service;

import com.textmessenger.model.User;

import java.util.List;

public interface UserService {

  long createUser(User user);

  User readUser(long id);

  void updateUser(long id, User user);

  void deleteUser(long id);
}
