package com.textmessenger.service;


import com.textmessenger.dto.transfer.UserTxDTO;
import com.textmessenger.mapper.UserMapper;
import com.textmessenger.model.entity.Notification;
import com.textmessenger.model.entity.Post;
import com.textmessenger.model.entity.User;
import com.textmessenger.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class UserServiceImpl implements UserService {

  private final UserRepository userRepository;

  private final UserMapper userMapper;

  public UserServiceImpl(UserRepository userRepository, UserMapper userMapper) {
    this.userRepository = userRepository;
    this.userMapper = userMapper;
  }

  @Override
  public UserTxDTO createUser(User user) {
    return userMapper.userToTxDto(userRepository.save(user));
  }

  @Override
  public User readUser(long id) {
    return userRepository.getOne(id);
  }

  @Override
  public void updateUser(User user) {
    userRepository.save(user);
  }

  @Override
  public void deleteUser(long id) {
    userRepository.delete(userRepository.getOne(id));
  }

  @Override
  public User getUserByLogin(String login) {
    return userRepository.findUserByLogin(login);
  }

  @Override
  public void deleteFromFavorites(Post post, User user) {
    User userByLogin = userRepository.findUserByLogin(user.getLogin());
    userByLogin.getFavorites().remove(post);
    userRepository.save(userByLogin);
  }

  @Override
  public void addLikers(Post post, User user) {
    User userByLogin = userRepository.findUserByLogin(user.getLogin());
    userByLogin.getFavorites().add(post);
    userRepository.save(userByLogin);
  }

  @Override
  public List<Post> getFavoritesById(Long id) {
    List<Post> favorites = userRepository.getOne(id).getFavorites();
    favorites.sort((e1, e2) -> e2.getCreatedDate().compareTo(e1.getCreatedDate()));
    return favorites;
  }

  @Override
  public List<Post> getFavoritesByLogin(String login) {
    List<Post> favorites = userRepository.findUserByLogin(login).getFavorites();
    favorites.sort((e1, e2) -> e2.getCreatedDate().compareTo(e1.getCreatedDate()));
    return favorites;
  }

  @Override
  public List<User> findUsersBySearch(String str) {
    return userRepository.findByEmailContainingIgnoreCaseOrLoginContainingIgnoreCase(str, str);
  }

  @Override
  public List<User> getFollowings(Long id) {
    return userRepository.getOne(id).getFollowing();
  }

  @Override
  public void addToFollowing(Long user, Long newUser) {
    User one = userRepository.getOne(newUser);
    userRepository.getOne(user).getFollowing().add(one);
  }

  @Override
  public void deleteFromFollowing(Long user, Long newUser) {
    userRepository.getOne(user).getFollowing().remove(userRepository.getOne(newUser));
  }

  @Override
  public User logIn(String email, String password) {
    return userRepository.findUserByEmail(email);
  }

  @Override
  public List<Notification> getAllNotificationByUserId(Long id) {
    return userRepository.getOne(id).getNotifications();
  }
}
