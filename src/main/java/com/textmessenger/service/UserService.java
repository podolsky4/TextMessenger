package com.textmessenger.service;

import com.textmessenger.dto.receive.PostRxDto;
import com.textmessenger.dto.receive.UserRxDto;
import com.textmessenger.dto.transfer.NotificationTxDto;
import com.textmessenger.dto.transfer.PostTxDto;
import com.textmessenger.dto.transfer.UserTxDto;

import java.util.List;

public interface UserService {

  UserTxDto createUser(UserRxDto user);

  UserTxDto readUser(long id);

  void updateUser(UserRxDto user);

  void deleteUser(long id);

  UserTxDto getUserByLogin(String login);

  void addLikers(PostRxDto post, UserRxDto user);

  void deleteFromFavorites(PostRxDto post, UserRxDto user);

  List<PostTxDto> getFavoritesById(Long id);

  List<PostTxDto> getFavoritesByLogin(String login);

  List<UserTxDto> findUsersBySearch(String str);

  List<UserTxDto> getFollowings(Long id);

  void addToFollowing(Long user, Long newUser);

  void deleteFromFollowing(Long user, Long newUser);

  UserTxDto logIn(String email, String password);

  List<NotificationTxDto> getAllNotificationByUserId(Long id);
  
  UserTxDto getCurrentUser();
}
