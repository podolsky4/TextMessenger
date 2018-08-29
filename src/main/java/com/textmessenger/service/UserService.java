package com.textmessenger.service;

import com.textmessenger.dto.transfer.NotificationTxDTO;
import com.textmessenger.dto.transfer.PostTxDTO;
import com.textmessenger.dto.transfer.UserTxDTO;
import com.textmessenger.model.entity.Post;
import com.textmessenger.model.entity.User;

import java.util.List;

public interface UserService {

  UserTxDTO createUser(User user);

  UserTxDTO readUser(long id);

  void updateUser(User user);

  void deleteUser(long id);

  UserTxDTO getUserByLogin(String login);

  void addLikers(Post post, User user);

  void deleteFromFavorites(Post post, User user);

  List<PostTxDTO> getFavoritesById(Long id);

  List<PostTxDTO> getFavoritesByLogin(String login);

  List<UserTxDTO> findUsersBySearch(String str);

  List<UserTxDTO> getFollowings(Long id);

  void addToFollowing(Long user, Long newUser);

  void deleteFromFollowing(Long user, Long newUser);

  UserTxDTO logIn(String email, String password);

  List<NotificationTxDTO> getAllNotificationByUserId(Long id);
}
