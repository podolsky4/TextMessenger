package com.textmessenger.service;

import com.textmessenger.model.entity.Notification;
import com.textmessenger.model.entity.Post;
import com.textmessenger.model.entity.User;
import com.textmessenger.model.entity.dto.CredentialsPassword;
import com.textmessenger.model.entity.dto.NotificationToFront;
import com.textmessenger.model.entity.dto.UserToFrontShort;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface UserService {

  String setUserIsEnabled(String token);

  User createUser(User user);

  User readUser(long id);

  void updateUser(User user);

  void deleteUser(long id);

  User getUserByLogin(String login);

  void addLikers(Post post, User user);

  void deleteFromFavorites(Post post, User user);

  List<Post> getFavoritesById(Long id);

  List<Post> getFavoritesByLogin(String login);

  List<User> findUsersBySearch(String str);

  List<User> getFollowings(Long id);

  void addToFollowing(Long user, Long newUser);

  void deleteFromFollowing(Long user, Long newUser);

  User logIn(String email, String password);

  List<Notification> getAllNotificationByUserId(Long id);

  UserToFrontShort getCurrentUser();

  Optional<List<User>> findUserByEmailOrLogin(User user);

  User getUserByEmail(String email);

  void sendEmailToResetPassword(User userByEmail);

  List<NotificationToFront> getAllNotificationByUser();

  String changePasswordForgot(CredentialsPassword credentialsPassword);

  void updateUserWithStringsAndFile(String firstName,
                                    String lastName,
                                    String address,
                                    String date,
                                    MultipartFile file) throws IOException;

  User getCurrentUserFull();

  String updatePasswordInitByUser(String oldPassword, String newPassword);

}

