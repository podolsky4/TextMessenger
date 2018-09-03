package com.textmessenger.controller;


import com.textmessenger.model.entity.Post;
import com.textmessenger.model.entity.TemporaryToken;
import com.textmessenger.model.entity.User;
import com.textmessenger.model.entity.dto.LoginRq;
import com.textmessenger.model.entity.dto.SearchValue;
import com.textmessenger.model.entity.dto.UserToFrontShort;
import com.textmessenger.repository.TemporaryTokenRepository;
import com.textmessenger.service.EmailService;
import com.textmessenger.service.LoginService;
import com.textmessenger.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.Date;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/users")
public class UserController {
  private final UserService userService;
  private LoginService loginService;
  private final EmailService emailService;
  private ApplicationEventPublisher applicationEventPublisher;
  @Autowired
  private TemporaryTokenRepository temporaryTokenRepository;

  public UserController(UserService userService, LoginService loginService, EmailService emailService,
                        ApplicationEventPublisher applicationEventPublisher) {
    this.userService = userService;
    this.loginService = loginService;
    this.emailService = emailService;
    this.applicationEventPublisher = applicationEventPublisher;
  }

  @PostMapping("/login")
  public ResponseEntity authenticateUser(@Valid @RequestBody LoginRq user) {
    return loginService.authenticateUser(user);
  }

  @GetMapping("/current")
  public ResponseEntity endpoint() {
    return ResponseEntity.ok().body(userService.getCurrentUser());
  }

  @PostMapping("/user")
  public ResponseEntity createUser(@Valid @RequestBody User user) {
    User user1;
    SimpleMailMessage email = new SimpleMailMessage();
    if(userService.findUserByEmailOrLogin(user).get().size() == 0){
      TemporaryToken tempToken = new TemporaryToken();
      tempToken.setToken(UUID.randomUUID().toString());
      tempToken.setExpiryDate(new Date());
      tempToken.setUser(user);
      temporaryTokenRepository.save(tempToken);
      user1 = userService.createUser(user);
      email.setTo(user1.getEmail());
      email.setSubject("confirmation link to create account at Text Messanger application");
      email.setText("http://localhost:3000/api/users/registered/" + tempToken.getToken());
      emailService.sendEmail(email);
      return ResponseEntity.ok().build();
    }
    return ResponseEntity.status(401).build();
  }

  @GetMapping("/registered/{token}")
  public void enableUser(@PathVariable("token") String token) {

  }


  @GetMapping("/{id}")
  public ResponseEntity readUser(@PathVariable("id") long id) {
    return Optional.of(ResponseEntity.ok().body(userService.readUser(id)))
            .orElse(ResponseEntity.notFound().build());
  }

  @PostMapping("/find")
  public ResponseEntity findAllUsers(@Valid @RequestBody SearchValue str) {
    return Optional.of(ResponseEntity.ok().body(userService.findUsersBySearch(str.getSearch())))
            .orElse(ResponseEntity.notFound().build());
  }

  @PutMapping
  public ResponseEntity updateUser(@Valid @RequestBody User user) {
    userService.updateUser(user);
    return ResponseEntity.ok().build();
  }

  @DeleteMapping("/{id}")
  public ResponseEntity deleteUser(@PathVariable("id") long id) {
    userService.deleteUser(id);
    return ResponseEntity.ok().build();
  }

  @GetMapping("/bylogin/{login}")
  public ResponseEntity getUserByLogin(@PathVariable("login") String login) {
    return ResponseEntity.ok().body(userService.getUserByLogin(login));
  }

  @PutMapping("/like/{id}")
  public ResponseEntity addToFavorites(@PathVariable("id") Post post, @RequestBody User user) {
    userService.addLikers(post, user);
    return ResponseEntity.status(201).build();
  }

  @DeleteMapping("/like/{id}")
  public ResponseEntity deleteFromFavorites(@PathVariable("id") Post post,
                                            @RequestBody User user) {
    userService.deleteFromFavorites(post, user);
    return ResponseEntity.status(204).build();
  }

  @GetMapping("/favorites/{id}")
  public ResponseEntity getFavorites(@PathVariable("id") long id) {
    return ResponseEntity.status(200).body(userService.getFavoritesById(id));
  }

  @GetMapping("/favorites/login/{login}")
  public ResponseEntity getFavoritesByLogin(@PathVariable("login") String login) {
    return ResponseEntity.status(200).body(userService.getFavoritesByLogin(login));
  }

  @GetMapping("/user/{id}/getFollowing")
  public ResponseEntity getFollowing(@PathVariable("id") long id) {
    return ResponseEntity.status(200).body(userService.getFollowings(id));
  }

  @GetMapping("/user/{userId}/addToFollowing/{newUser}")
  public ResponseEntity addToFollowing(@PathVariable("userId") long user, @PathVariable("newUser") long newUser) {
    userService.addToFollowing(user, newUser);
    return ResponseEntity.status(200).build();
  }

  @DeleteMapping("/user/{userId}/addToFollowing/{newUser}")
  public ResponseEntity deleteFromFollowing(@PathVariable("userId") long user, @PathVariable("newUser") long newUser) {
    userService.deleteFromFollowing(user, newUser);
    return ResponseEntity.status(200).build();
  }

  @GetMapping("user/{id}/notification")
  public ResponseEntity getNotification(@PathVariable("id") long id) {
    return ResponseEntity.ok().body(userService.getAllNotificationByUserId(id));
  }
}
