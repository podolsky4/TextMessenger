package com.textmessenger.service;

import com.textmessenger.dto.receive.PostRxDTO;
import com.textmessenger.dto.receive.UserRxDTO;
import com.textmessenger.dto.transfer.NotificationTxDTO;
import com.textmessenger.dto.transfer.PostTxDTO;
import com.textmessenger.dto.transfer.UserTxDTO;

import java.util.List;

public interface UserService {

  UserTxDTO createUser(UserRxDTO user);

  UserTxDTO readUser(long id);

  void updateUser(UserRxDTO user);

  void deleteUser(long id);

  UserTxDTO getUserByLogin(String login);

  void addLikers(PostRxDTO post, UserRxDTO user);

  void deleteFromFavorites(PostRxDTO post, UserRxDTO user);

  List<PostTxDTO> getFavoritesById(Long id);

  List<PostTxDTO> getFavoritesByLogin(String login);

  List<UserTxDTO> findUsersBySearch(String str);

  List<UserTxDTO> getFollowings(Long id);

  void addToFollowing(Long user, Long newUser);

  void deleteFromFollowing(Long user, Long newUser);

  UserTxDTO logIn(String email, String password);

  List<NotificationTxDTO> getAllNotificationByUserId(Long id);
  
  UserTxDTO getCurrentUser();
}
