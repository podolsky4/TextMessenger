package com.textmessenger.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.textmessenger.config.AmazonConfig;
import com.textmessenger.config.AsyncConfiguration;
import com.textmessenger.model.entity.Notification;
import com.textmessenger.model.entity.Post;
import com.textmessenger.model.entity.TemporaryToken;
import com.textmessenger.model.entity.User;
import com.textmessenger.model.entity.WebSocketType;
import com.textmessenger.model.entity.dto.CredentialsPassword;
import com.textmessenger.model.entity.dto.NotificationToFront;
import com.textmessenger.model.entity.dto.UserToFrontShort;
import com.textmessenger.repository.TemporaryTokenRepository;
import com.textmessenger.repository.UserRepository;
import com.textmessenger.security.SessionAware;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;

@Service
@Transactional
public class UserServiceImpl extends SessionAware implements UserService {

  @Autowired
  PasswordEncoder passwordEncoder;
  private static final String BUCKET = AmazonConfig.BUCKET_NAME;//NOSONAR
  private AmazonConfig s3;
  private final UserRepository userRepository;
  private final TemporaryTokenRepository temporaryTokenRepository;
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
        emailService.sendEmailFromMethods(user.getEmail(), "Congratulation your account is activate",
                "Enjoy our application");
        temporaryTokenRepository.delete(byToken.get());
        return "your user is activate";
      }
      TemporaryToken temporaryToken = byToken.get();
      temporaryToken.setToken(UUID.randomUUID().toString());
      temporaryToken.setExpiryDate(temporaryToken.calculateExpiryDate());
      User save = userRepository.save(user);
      temporaryToken.setUser(save);
      temporaryTokenRepository.save(temporaryToken);
      emailService.sendEmailFromMethods(user.getEmail(), "repeated link to activate",
              "http://18.232.156.81:9000/api/users/registered/", temporaryToken.getToken());
      return "your link is old, we send new link, please check your registration email";
    } else {
      return "this token is not valid";
    }
  }

  @Override
  public User createUser(User user) {
    TemporaryToken tempToken = new TemporaryToken();
    tempToken.setToken(UUID.randomUUID().toString());
    tempToken.setExpiryDate(new Date());
    user.setPassword(passwordEncoder.encode(user.getPassword()));
    User user1 = userRepository.save(user);
    tempToken.setUser(user1);
    temporaryTokenRepository.save(tempToken);
    emailService.sendEmailFromMethods(user1.getEmail(),
            "confirmation link to create account at Text Messenger application",
            "http://18.232.156.81:9000/registered/", tempToken.getToken());
    return userRepository.getOne(user.getId());
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
  public void deleteFromFollowing(Long user, Long newUser) {
    userRepository.getOne(user).getFollowing().remove(userRepository.getOne(newUser));
  }

  @Override
  public UserToFrontShort getCurrentUser() {
    Object principal = SecurityContextHolder
            .getContext()
            .getAuthentication()
            .getPrincipal();
    if (!"anonymousUser".equals(principal.toString())) {
      return UserToFrontShort.convertUserForFront(getLoggedInUser());
    }
    return new UserToFrontShort();
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
    emailService.sendEmailFromMethods(userByEmail.getEmail(),
            "Follow the link to reset you password in the Text Messenger",
            "http://18.232.156.81:9000/resetPassword/", tempToken.getToken());
  }

  @Override
  public List<NotificationToFront> getAllNotificationByUser() {
    User one = getLoggedInUser();
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
    User one = getLoggedInUser();
    if (firstName != "undefined") { //NOSONAR
      one.setFirstName(firstName);
    }
    if (lastName != "undefined") { //NOSONAR
      one.setLastName(lastName);
    }
    if (address != "undefined") { //NOSONAR
      one.setAddress(address);
    }
    if (date != "undefined") { //NOSONAR
      one.setDateBirthday(LocalDate.parse(date));
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
  public User getCurrentUserFull() {
    return getLoggedInUser();
  }

  @Override
  public String updatePasswordInitByUser(String oldPassword, String newPassword) {

    User temp = getLoggedInUser();
    if (passwordEncoder.matches(oldPassword, temp.getPassword())) {
      temp.setPassword(passwordEncoder.encode(newPassword));
      userRepository.save(temp);
      return "Password changed successfully";
    } else {
      return "Current password is not valid";
    }
  }

  @Override
  @Async(AsyncConfiguration.TASK_EXECUTOR_SERVICE)
  public CompletableFuture<Page<User>> findAll(final Pageable pageable) {
    return userRepository.findAllBy(pageable);
  }

  @Override
  @Async(AsyncConfiguration.TASK_EXECUTOR_SERVICE)
  public CompletableFuture<Optional<User>> findOneById(final long id) {
    return userRepository
            .findOneById(id)
            .thenApply(Optional::ofNullable);
  }

}