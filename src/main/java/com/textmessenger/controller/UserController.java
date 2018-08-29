package com.textmessenger.controller;

import com.fasterxml.jackson.annotation.JsonView;
import com.textmessenger.dto.receive.PostRxDTO;
import com.textmessenger.dto.receive.UserRxDTO;
import com.textmessenger.dto.transfer.UserTxDTO;
import com.textmessenger.dto.view.UserView;
import com.textmessenger.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.lang.reflect.Array;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin
public class UserController {

  private static UserTxDTO userEndPoint = null;
  private final UserService userService;

  public UserController(UserService userService) {
    this.userService = userService;
  }

  @GetMapping("/current")
  public ResponseEntity endpoint() {

    Array[] arr = new Array[0];
    if (userEndPoint == null) {
      return ResponseEntity.status(204).body(arr);

    } else {
      return ResponseEntity.status(200).body(userEndPoint);
    }
  }

  @DeleteMapping("/current")
  public void deleteCurrent() {
    userEndPoint = null; //NOSONAR
  }


  @JsonView(UserView.UserPostReturn.class)
  @PostMapping("/user")
  public ResponseEntity<?> createUser(@Valid @RequestBody UserRxDTO user) {
    return ResponseEntity.status(201).body(userService.createUser(user));
  }

  @GetMapping("/{id}")
  public ResponseEntity<?> readUser(@PathVariable("id") long id) {
    return Optional.of(ResponseEntity.ok().body(userService.readUser(id)))
            .orElse(ResponseEntity.notFound().build());
  }

  @PostMapping("/find")
  public ResponseEntity findAllUsers(@RequestBody String str) {
    return Optional.of(ResponseEntity.ok().body(userService.findUsersBySearch(str)))
            .orElse(ResponseEntity.notFound().build());
  }

  @PutMapping
  public ResponseEntity<?> updateUser(@Valid @RequestBody UserRxDTO user) {
    userService.updateUser(user);
    return ResponseEntity.ok().build();
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<?> deleteUser(@PathVariable("id") long id) {
    userService.deleteUser(id);
    return ResponseEntity.ok().build();
  }

  @GetMapping("/bylogin/{login}")
  public ResponseEntity<?> getUserByLogin(@PathVariable("login") String login) {
    return ResponseEntity.ok().body(userService.getUserByLogin(login));
  }

  @PutMapping("/post/{id}")
  public ResponseEntity<?> addToFavorites(@Valid @PathVariable("id") PostRxDTO post,@Valid @RequestBody UserRxDTO user) {
    userService.addLikers(post, user);
    return ResponseEntity.status(201).build();
  }

  @DeleteMapping("/post/{id}")
  public ResponseEntity<?> deleteFromFavorites(@Valid @PathVariable("id") PostRxDTO post,
                                               @Valid @RequestBody UserRxDTO user) {
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

  @PostMapping("/user/{email}")
  public ResponseEntity logInUser(@PathVariable("email") String email, @RequestBody String password) {
    UserTxDTO user = userService.logIn(email, password);
    if (user == null) {
      return ResponseEntity.status(204).body("Wrong email ");
    } else if (!user.getPassword().equals(password)) {
      return ResponseEntity.status(205).body("Incorrect passwoord");
    } else {
      userEndPoint = user; //NOSONAR
      return ResponseEntity.status(200).body(user);
    }
  }

  @GetMapping("user/{id}/notification")
  public ResponseEntity getNotification(@PathVariable("id") long id) {
    return ResponseEntity.ok().body(userService.getAllNotificationByUserId(id));
  }
}
