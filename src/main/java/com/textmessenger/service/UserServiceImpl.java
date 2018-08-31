package com.textmessenger.service;


import com.textmessenger.dto.receive.PostRxDTO;
import com.textmessenger.dto.receive.UserRxDTO;
import com.textmessenger.dto.transfer.NotificationTxDTO;
import com.textmessenger.dto.transfer.PostTxDTO;
import com.textmessenger.dto.transfer.UserTxDTO;
import com.textmessenger.mapper.NotificationMapper;
import com.textmessenger.mapper.PostMapper;
import com.textmessenger.mapper.UserMapper;
import com.textmessenger.model.entity.Post;
import com.textmessenger.model.entity.User;
import com.textmessenger.repository.UserRepository;
import com.textmessenger.security.UserPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UserServiceImpl implements UserService {

  private final UserRepository userRepository;
  private final PostMapper postMapper;
  private final NotificationMapper notificationMapper;
  private final UserMapper userMapper;

  public UserServiceImpl(UserRepository userRepository, UserMapper userMapper, PostMapper postMapper,
                         NotificationMapper notificationMapper) {
    this.userRepository = userRepository;
    this.userMapper = userMapper;
    this.notificationMapper = notificationMapper;
    this.postMapper = postMapper;
  }

  @Override
  public UserTxDTO createUser(UserRxDTO user) {
    return userMapper.userToTxDto(userRepository.save(userMapper.userRxDtoToUser(user)));
  }

  @Override
  public UserTxDTO readUser(long id) {
    return userMapper.userToTxDto(userRepository.getOne(id));
  }

  @Override
  public void updateUser(UserRxDTO user) {
    userRepository.save(userMapper.userRxDtoToUser(user));
  }

  @Override
  public void deleteUser(long id) {
    userRepository.delete(userRepository.getOne(id));
  }

  @Override
  public UserTxDTO getUserByLogin(String login) {
    return userMapper.userToTxDto(userRepository.findUserByLogin(login));
  }

  @Override
  public void deleteFromFavorites(PostRxDTO post, UserRxDTO user) {
    User userByLogin = userRepository.findUserByLogin(userMapper.userRxDtoToUser(user).getLogin());
    userByLogin.getFavorites().remove(postMapper.postRxDtoToPost(post));
    userRepository.save(userByLogin);
  }

  @Override
  public void addLikers(PostRxDTO post, UserRxDTO user) {
    User userByLogin = userRepository.findUserByLogin(userMapper.userRxDtoToUser(user).getLogin());
    userByLogin.getFavorites().add(postMapper.postRxDtoToPost(post));
    userRepository.save(userByLogin);
  }

  @Override
  public List<PostTxDTO> getFavoritesById(Long id) {
    List<Post> favorites = userRepository.getOne(id).getFavorites();
    favorites.sort((e1, e2) -> e2.getCreatedDate().compareTo(e1.getCreatedDate()));
    return postMapper.postsToTxDtos(favorites);
  }

  @Override
  public List<PostTxDTO> getFavoritesByLogin(String login) {
    List<Post> favorites = userRepository.findUserByLogin(login).getFavorites();
    favorites.sort((e1, e2) -> e2.getCreatedDate().compareTo(e1.getCreatedDate()));
    return postMapper.postsToTxDtos(favorites);
  }

  @Override
  public List<UserTxDTO> findUsersBySearch(String str) {
    return userMapper.usersToTxDtos(userRepository.findByEmailContainingIgnoreCaseOrLoginContainingIgnoreCase(str, str));
  }

  @Override
  public List<UserTxDTO> getFollowings(Long id) {
    return userMapper.usersToTxDtos(userRepository.getOne(id).getFollowing());
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
  public UserTxDTO logIn(String email, String password) {
    return userMapper.userToTxDto(userRepository.findUserByEmail(email));
  }

  @Override
  public List<NotificationTxDTO> getAllNotificationByUserId(Long id) {
    return notificationMapper.notsToNotTxDtos(userRepository.getOne(id).getNotifications());
  }

  @Override
  public User getCurrentUser() {
    UserPrincipal userPrincipal = (UserPrincipal) SecurityContextHolder
            .getContext()
            .getAuthentication()
            .getPrincipal();
    Optional<User> user = userRepository.findById(userPrincipal.getId());
    if (user.isPresent()) {
      return user.get();
    }
    throw new UsernameNotFoundException("User not found!");
  }
}
