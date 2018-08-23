package com.textmessenger.controller;

import com.textmessenger.model.entity.Post;
import com.textmessenger.model.entity.User;
import com.textmessenger.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Array;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin
public class UserController {

  private static User userEndPoint = null;
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
  public void deleteCurrent (){
    userEndPoint=null;
  }


  @PostMapping("/user")
  public ResponseEntity<?> createUser(@RequestBody User user) {
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
  public ResponseEntity<?> updateUser(@RequestBody User user) {
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
  public ResponseEntity<?> addToFavorites(@PathVariable("id") Post post, @RequestBody User user) {
    userService.addLikers(post, user);
    return ResponseEntity.status(201).build();
  }

  @DeleteMapping("/post/{id}")
  public ResponseEntity<?> deleteFromFavorites(@PathVariable("id") Post post, @RequestBody User user) {
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
  public ResponseEntity getFollowing(@PathVariable("id") Long id) {
    return ResponseEntity.status(200).body(userService.getFollowings(id));
  }

  @GetMapping("/user/{userId}/addToFollowing/{newUser}")
  public ResponseEntity addToFollowing(@PathVariable("userId") Long user, @PathVariable("newUser") Long newUser) {
    userService.addToFollowing(user, newUser);
    return ResponseEntity.status(200).build();
  }

  @DeleteMapping("/user/{userId}/addToFollowing/{newUser}")
  public ResponseEntity deleteFromFollowing(@PathVariable("userId") Long user, @PathVariable("newUser") Long newUser) {
    userService.deleteFromFollowing(user, newUser);
    return ResponseEntity.status(200).build();
  }

  @PostMapping("/user/{email}")
  public ResponseEntity logInUser(@PathVariable("email") String email, @RequestBody String password) {
    User user = userService.logIn(email, password);
    if (user == null) {
      return ResponseEntity.status(204).body("Wrong email ");
    } else if (!user.getPassword().equals(password)) {
      return ResponseEntity.status(205).body("Incorrect passwoord");
    } else {
      userEndPoint = user; //NOSONAR
      return ResponseEntity.status(200).body(user);
    }
  }
}
