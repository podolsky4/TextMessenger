package com.textmessenger.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.textmessenger.config.AmazonConfig;
import com.textmessenger.constant.WebSocketType;
import com.textmessenger.model.entity.Notification;
import com.textmessenger.model.entity.Post;
import com.textmessenger.model.entity.TemporaryToken;
import com.textmessenger.model.entity.User;
import com.textmessenger.model.entity.dto.CredentialsPassword;
import com.textmessenger.model.entity.dto.NotificationToFront;
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
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
public class UserServiceImpl implements UserService {
  @Autowired
  PasswordEncoder passwordEncoder;
  private static final String BUCKET = AmazonConfig.BUCKET_NAME;//NOSONAR
  private AmazonConfig s3;
  private final UserRepository userRepository;
  private final TemporaryTokenRepository temporaryTokenRepository;
  private UserToFrontShort userToFront;
  private final EmailService emailService;
  private final NotificationService notificationService;


  public UserServiceImpl(UserRepository userRepository, TemporaryTokenRepository temporaryTokenRepository,
                         EmailService emailService,
                         NotificationService notificationService,
                         AmazonConfig s3) {
    this.userRepository = userRepository;
    this.temporaryTokenRepository = temporaryTokenRepository;
    this.emailService = emailService;
    this.notificationService = notificationService;
    this.s3 = s3;
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
        return "your user is activate";
      }
      TemporaryToken temporaryToken = byToken.get();
      temporaryToken.setToken(UUID.randomUUID().toString());
      temporaryToken.setExpiryDate(temporaryToken.calculateExpiryDate());
      User save = userRepository.save(user);
      temporaryToken.setUser(save);
      temporaryTokenRepository.save(temporaryToken);
      SimpleMailMessage email = new SimpleMailMessage();
      email.setTo(user.getEmail());
      email.setSubject("repeated link to activate");
      email.setText("http://localhost:3000/api/users/registered/" + temporaryToken.getToken());
      emailService.sendEmail(email);
      return "your link is old, we send new link, please check your registration email";
    } else {
      return "this token is not valid";
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
    notificationService.createSome(WebSocketType.NEW_LIKE.toString(), post.getUser(), userByLogin, post);
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
    User main = userRepository.getOne(user);
    main.getFollowing().add(one);
    notificationService.createSome(WebSocketType.NEW_FOLLOWER.toString(), one, main);
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

  @Override
  public User getUserByEmail(String email) {
    return userRepository.findUserByEmail(email);
  }

  @Override
  public void sendEmailToResetPassword(User userByEmail) {
    TemporaryToken tempToken = new TemporaryToken();
    tempToken.setToken(UUID.randomUUID().toString());
    tempToken.setExpiryDate(new Date());
    tempToken.setUser(userByEmail);
    temporaryTokenRepository.save(tempToken);
    SimpleMailMessage email = new SimpleMailMessage();
    email.setTo(userByEmail.getEmail());
    email.setSubject("Follow the link to reset you password in the Text Messenger");
    email.setText("http://localhost:3000/resetPassword/" + tempToken.getToken());
    emailService.sendEmail(email);
  }

  @Override
  public List<NotificationToFront> getAllNotificationByUser() {
    UserPrincipal userPrincipal = (UserPrincipal) SecurityContextHolder
            .getContext()
            .getAuthentication()
            .getPrincipal();
    User one = userRepository.getOne(userPrincipal.getId());
    List<Notification> notifications = one.getNotifications();
    notifications.sort((e1, e2) -> e2.getCreatedDate().compareTo(e1.getCreatedDate()));
    return NotificationToFront.convertListNotificationToFront(notifications);
  }

  @Override
  public String changePasswordForgot(CredentialsPassword credentialsPassword) {
    Optional<TemporaryToken> byToken = temporaryTokenRepository.findByToken(credentialsPassword.getToken());
    if (byToken.isPresent()) {
      if (byToken.get().getExpiryDate().before(new Date())) {
        User user = userRepository.findById(byToken.get().getUser().getId()).get();
        user.setPassword(passwordEncoder.encode(credentialsPassword.getPassword()));
        userRepository.save(user);
        temporaryTokenRepository.delete(byToken.get());
        return "Password successfully change";
      } else {
        temporaryTokenRepository.delete(byToken.get());
        sendEmailToResetPassword(byToken.get().getUser());
        return "Oops. Your request is denied, you token is old. We have send you a new token.Please, check you email";
      }
    }
    return "Sorry. This token in invalid.";
  }

  @Override
  public void updateUserWithStringsAndFile(String firstName,
                                           String lastName,
                                           String address,
                                           String date,
                                           MultipartFile file) throws IOException {
    UserPrincipal userPrincipal = (UserPrincipal) SecurityContextHolder
            .getContext()
            .getAuthentication()
            .getPrincipal();
    User one = userRepository.getOne(userPrincipal.getId());
    if (firstName != "undefined") { //NOSONAR
      one.setFirstName(firstName);
    }
    if (lastName != "undefined") { //NOSONAR
      one.setLastName(lastName);
    }
    if (address != "undefined") { //NOSONAR
      one.setAddress(address);
    }
    if (file != null) {
      String typeFile = file.getContentType();
      String type = "." + typeFile.substring(6);
      String key = "userAvatar/" + UUID.randomUUID() + type;
      InputStream fileFromFront = file.getInputStream();
      AmazonS3 amazonS3 = s3.getConnection();
      amazonS3.putObject(
              BUCKET,
              key,
              fileFromFront,
              new ObjectMetadata());
      String userHeader = amazonS3.getUrl(BUCKET, key).toString();
      if (one.getProfilePhoto() == null) {
        one.setProfilePhoto(userHeader);
      }
    }
    userRepository.save(one);
  }

  @Override
  public void updateUserWithNullFileds(User user) {
    UserPrincipal userPrincipal = (UserPrincipal) SecurityContextHolder
            .getContext()
            .getAuthentication()
            .getPrincipal();
    User one = userRepository.getOne(userPrincipal.getId());
    if (user.getFirstName() != null) {
      one.setFirstName(user.getFirstName());
    }
    if (user.getLastName() != null) {
      one.setLastName(user.getLastName());
    }
    if (user.getAddress() != null) {
      one.setAddress(user.getAddress());
    }
    if (user.getDateBirthday() != null) {
      one.setDateBirthday(user.getDateBirthday());
    }
    if (user.getProfileHeader() != null) {
      one.setProfileHeader(user.getProfileHeader());
    }
    userRepository.save(user);
  }
}