package com.textmessenger.service;

import com.textmessenger.model.User;

public interface UserService {

  long createUser(User user);
  User readUser(long id);
  void updateUser(long id, User user);
  void deleteUser(long id);

}
