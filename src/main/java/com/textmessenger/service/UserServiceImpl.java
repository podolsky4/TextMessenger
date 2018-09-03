package com.textmessenger.service;

import com.textmessenger.model.entity.Notification;
import com.textmessenger.model.entity.Post;
import com.textmessenger.model.entity.TemporaryToken;
import com.textmessenger.model.entity.User;
import com.textmessenger.model.entity.dto.UserToFrontShort;
import com.textmessenger.repository.TemporaryTokenRepository;
import com.textmessenger.repository.UserRepository;
import com.textmessenger.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
public class UserServiceImpl implements UserService {
  @Autowired
  PasswordEncoder passwordEncoder;
  private final UserRepository userRepository;
  private final TemporaryTokenRepository temporaryTokenRepository;
  private UserToFrontShort userToFront;
  private final EmailService emailService;


  public UserServiceImpl(UserRepository userRepository, TemporaryTokenRepository temporaryTokenRepository,
                         EmailService emailService) {
    this.userRepository = userRepository;
    this.temporaryTokenRepository = temporaryTokenRepository;
    this.emailService = emailService;
  }

  @Override
  public String setUserIsEnabled(String token) {
    Optional<TemporaryToken> byToken = temporaryTokenRepository.findByToken(token);
    if (byToken.isPresent()) {
      User user = byToken.get().getUser();
      if (byToken.get().getExpiryDate().compareTo(new Date()) <= 0) {
        user.setEnabled(true);
        userRepository.save(user);
        SimpleMailMessage email = new SimpleMailMessage();
        email.setTo(user.getEmail());
        email.setSubject("Congratulation your account is activate");
        email.setText("Enjoy our application");
        emailService.sendEmail(email);
        temporaryTokenRepository.delete(byToken.get());
        return new String("your user is activate");
      }
      TemporaryToken temporaryToken = byToken.get();
      temporaryToken.setToken(UUID.randomUUID().toString());
      temporaryToken.setExpiryDate(temporaryToken.calculateExpiryDate(new Date().getMinutes()));
      User save = userRepository.save(user);
      temporaryToken.setUser(save);
      temporaryTokenRepository.save(temporaryToken);
      SimpleMailMessage email = new SimpleMailMessage();
      email.setTo(user.getEmail());
      email.setSubject("repeated link to activate");
      email.setText("http://localhost:3000/api/users/registered/" + temporaryToken.getToken());
      emailService.sendEmail(email);
      return new String("your link is old, we send new link, please check your registration email");
    } else {
      return new String("this token is not valid");
    }
  }

  @Override
  public User createUser(User user) {
    user.setPassword(passwordEncoder.encode(user.getPassword()));

    return userRepository.save(user);
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
  public Optional<List<User>> findUserByEmailOrLogin(User user) {
    return Optional.of(userRepository
            .findByEmailContainingIgnoreCaseOrLoginContainingIgnoreCase(user.getLogin(), user.getEmail()));
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

  @Override
  public UserToFrontShort getCurrentUser() {
    UserPrincipal userPrincipal = (UserPrincipal) SecurityContextHolder
            .getContext()
            .getAuthentication()
            .getPrincipal();
    Optional<User> user = userRepository.findById(userPrincipal.getId());
    if (user.isPresent()) {
      return userToFront.convertUserForFront(user.get());
    }
    throw new UsernameNotFoundException("User not found!");
  }
}
