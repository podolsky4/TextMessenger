package com.textmessenger.controller;

import com.textmessenger.model.entity.Post;
import com.textmessenger.model.entity.User;
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

import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin
public class UserController {

  private final UserService userService;

  public UserController(UserService userService) {
    this.userService = userService;
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
  public ResponseEntity<?> findAllUsers(@RequestBody String str) {
    System.out.println(str);
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
}
