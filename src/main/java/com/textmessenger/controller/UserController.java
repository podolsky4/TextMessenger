package com.textmessenger.controller;

import com.fasterxml.jackson.annotation.JsonView;
import com.textmessenger.dto.receive.PostRxDto;
import com.textmessenger.dto.receive.UserRxDto;
import com.textmessenger.dto.view.UserView;
import com.textmessenger.model.entity.dto.LoginRq;
import com.textmessenger.model.entity.dto.SearchValue;
import com.textmessenger.service.LoginService;
import com.textmessenger.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {
  private final UserService userService;
  private LoginService loginService;

  public UserController(UserService userService, LoginService loginService) {
    this.userService = userService;
    this.loginService = loginService;
  }

  @PostMapping("/login")
  public ResponseEntity authenticateUser(@Valid @RequestBody LoginRq user) {
    return loginService.authenticateUser(user);
  }

  @GetMapping("/current")
  public ResponseEntity endpoint() {
    return ResponseEntity.ok().body(userService.getCurrentUser());
  }

  @JsonView(UserView.UserShort.class)
  @PostMapping("/user")
  public ResponseEntity<?> createUser(@Valid @RequestBody UserRxDto user) {
    return ResponseEntity.status(201).body(userService.createUser(user));
  }

  @JsonView(UserView.UserProfile.class)
  @GetMapping("/{id}")
  public ResponseEntity<?> readUser(@PathVariable("id") long id) {
    return Optional.of(ResponseEntity.ok().body(userService.readUser(id)))
            .orElse(ResponseEntity.notFound().build());
  }

  @JsonView(UserView.UserBaseId.class)
  @PostMapping("/find")
  public ResponseEntity findAllUsers(@Valid @RequestBody SearchValue str) {
    return Optional.of(ResponseEntity.ok().body(userService.findUsersBySearch(str.getSearch())))
            .orElse(ResponseEntity.notFound().build());
  }

  @PutMapping
  public ResponseEntity<?> updateUser(@Valid @RequestBody UserRxDto user) {
    userService.updateUser(user);
    return ResponseEntity.ok().build();
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<?> deleteUser(@PathVariable("id") long id) {
    userService.deleteUser(id);
    return ResponseEntity.ok().build();
  }

  @JsonView(UserView.UserProfile.class)
  @GetMapping("/bylogin/{login}")
  public ResponseEntity<?> getUserByLogin(@PathVariable("login") String login) {
    return ResponseEntity.ok().body(userService.getUserByLogin(login));
  }

  @PutMapping("/post/{id}")
  public ResponseEntity<?> addToFavorites(@Valid @PathVariable("id") PostRxDto post, @Valid @RequestBody UserRxDto user) {
    userService.addLikers(post, user);
    return ResponseEntity.status(201).build();
  }

  @DeleteMapping("/post/{id}")
  public ResponseEntity<?> deleteFromFavorites(@Valid @PathVariable("id") PostRxDto post,
                                               @Valid @RequestBody UserRxDto user) {
    userService.deleteFromFavorites(post, user);
    return ResponseEntity.status(204).build();
  }

  @GetMapping("/favorites/{id}")
  public ResponseEntity<?> getFavorites(@PathVariable("id") long id) {
    return ResponseEntity.status(200).body(userService.getFavoritesById(id));
  }

  @GetMapping("/favorites/login/{login}")
  public ResponseEntity<?> getFavoritesByLogin(@PathVariable("login") String login) {
    return ResponseEntity.status(200).body(userService.getFavoritesByLogin(login));
  }

  @JsonView(UserView.UserFull.class)
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
