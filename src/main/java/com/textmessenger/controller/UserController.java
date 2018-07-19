package com.textmessenger.controller;

import com.textmessenger.model.User;
import com.textmessenger.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/users")
public class UserController {

  private final UserService userService;

  @Autowired
  public UserController(UserService userService) {
    this.userService = userService;
  }

  // Requests mapping

  @GetMapping
  public ResponseEntity<List<User>> retrieveUserList() {
    List<User> userList = userService.findAll();
    return (!userList.isEmpty())
            ? new ResponseEntity<>(userList, HttpStatus.OK)
            : new ResponseEntity<>(HttpStatus.NO_CONTENT);

  }

  @GetMapping("/{id}")
  public ResponseEntity<User> retrieveUser(@PathVariable int id) {
    Optional<User> user = userService.findById(id);
    return user
            .map(u -> new ResponseEntity<>(u, HttpStatus.OK))
            .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
  }
}
