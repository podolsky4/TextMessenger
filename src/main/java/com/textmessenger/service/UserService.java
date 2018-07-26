package com.textmessenger.service;

import com.textmessenger.model.entity.User;

public interface UserService {

  User createUser(User user);

  User readUser(long id);

  void updateUser(User user);

  void deleteUser(long id);

}
