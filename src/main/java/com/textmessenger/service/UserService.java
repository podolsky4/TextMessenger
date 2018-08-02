package com.textmessenger.service;

import com.textmessenger.model.entity.Post;
import com.textmessenger.model.entity.User;

import java.util.List;

public interface UserService {

  User createUser(User user);

  User readUser(long id);

  void updateUser(User user);

  void deleteUser(long id);

  User getUserByLogin(String login);

  void addLikers(Post post, User user);

  void deleteFromFavorites(Post post, User user);

  List<Post> getFavoritesById(Long id);
}
