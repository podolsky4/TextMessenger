package com.textmessenger.controller;

import com.textmessenger.model.User;
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

import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

  private final UserService userService;

  public UserController(UserService userService) {
    this.userService = userService;
  }

  @PostMapping("/user")
  public ResponseEntity<?> createUser(@RequestBody User user) {
    long userId = userService.createUser(user);
    return ResponseEntity.ok().body("new User created with Id: " + userId);
  }

  @GetMapping("/{id}")
  public ResponseEntity<User> readUser(@PathVariable("id") long id) {
    return Optional.ofNullable(ResponseEntity.ok().body(userService.readUser(id)))
            .orElse(ResponseEntity.notFound().build());
  }

  @PutMapping("/{id}")
  public ResponseEntity<?> updateUser(@PathVariable("id") long id, @RequestBody User user) {
    userService.updateUser(id, user);
    return ResponseEntity.ok().body(userService.readUser(id) + " is updated");
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<?> deleteUser(@PathVariable("id") long id) {
    userService.deleteUser(id);
    return ResponseEntity.ok().body("user with id: " + id + " deleted");
  }
}
