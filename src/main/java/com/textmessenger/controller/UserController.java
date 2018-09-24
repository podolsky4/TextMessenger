package com.textmessenger.controller;

import com.textmessenger.config.AsyncConfiguration;
import com.textmessenger.model.entity.Post;
import com.textmessenger.model.entity.User;
import com.textmessenger.model.entity.dto.CredentialsPassword;
import com.textmessenger.model.entity.dto.FieldFromFront;
import com.textmessenger.model.entity.dto.LoginRq;
import com.textmessenger.model.entity.dto.PostToFront;
import com.textmessenger.model.entity.dto.ResponseToFront;
import com.textmessenger.model.entity.dto.SearchValue;
import com.textmessenger.model.entity.dto.UserToFrontFull;
import com.textmessenger.service.LoginService;
import com.textmessenger.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.IOException;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;
import java.util.function.Function;

@RestController
@RequestMapping(value = UserController.REQUEST_PATH_API_USERS)
public class UserController {

  static final String REQUEST_PATH_API_USERS = "/api/users";
  private static final Logger log = LoggerFactory.getLogger(UserController.class);
  private final UserService userService;
  private final LoginService loginService;

  public UserController(UserService userService,
                        LoginService loginService) {
    this.userService = userService;
    this.loginService = loginService;
  }

  @GetMapping
  public ResponseEntity getFullUser() {
    return ResponseEntity.ok().body(UserToFrontFull.convertUserForFront(userService.getCurrentUserFull()));
  }

  @PostMapping("/forgotpassword")
  public ResponseEntity forgotPassword(@RequestBody String email) {
    User userByEmail = userService.getUserByEmail(email);
    if (userByEmail != null) {
      userService.sendEmailToResetPassword(userByEmail);
      return ResponseEntity.ok()
              .body(ResponseToFront.convertResponseToFront("We send you mail please check you email"));
    }
    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
            .body(ResponseToFront.convertResponseToFront("This email is not registration on our Application"));
  }

  @PostMapping("/changePassword")
  public ResponseEntity changePasswordFromForgotPage(@Valid @RequestBody CredentialsPassword credentialsPassword) {
    return ResponseEntity.status(200)
            .body(ResponseToFront.convertResponseToFront(userService.changePasswordForgot(credentialsPassword)));
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
    if (userService.getUserByLogin(user.getLogin()) != null) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST)
              .body(ResponseToFront.convertResponseToFront("this login is busy"));
    } else if (userService.getUserByEmail(user.getEmail()) != null) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST)
              .body(ResponseToFront.convertResponseToFront("this email is busy"));
    }
    userService.createUser(user);
    return ResponseEntity.ok()
            .body(ResponseToFront.convertResponseToFront("Check you email we send you registration link"));

  }

  @GetMapping("/registered/{token}")
  public ResponseEntity enableUser(@PathVariable("token") String token) {
    return ResponseEntity.ok().body(ResponseToFront.convertResponseToFront(userService.setUserIsEnabled(token)));
  }

  @Async(AsyncConfiguration.TASK_EXECUTOR_CONTROLLER)
  @GetMapping("/{id}")
  public CompletableFuture<ResponseEntity> readUser(@PathVariable("id") long id) {
    return userService
            .findOneById(id)
            .thenApply(mapMaybeUserToResponse)
            .exceptionally(handleGetUserFailure.apply(id));
  }

  @Async(AsyncConfiguration.TASK_EXECUTOR_CONTROLLER)
  @GetMapping("/all")
  public CompletableFuture<ResponseEntity> getUsers(final Pageable paging) {
    return userService
            .findAll(paging)
            .<ResponseEntity>thenApply(ResponseEntity::ok)
            .exceptionally(handleGetUsersFailure);
  }

  private static Function<Throwable, ResponseEntity> handleGetUsersFailure = throwable -> {
    log.error("Unable to retrieve users", throwable);
    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
  };

  private static Function<Optional<User>, ResponseEntity> mapMaybeUserToResponse = maybeUser -> maybeUser
          .<ResponseEntity>map(ResponseEntity::ok)
          .orElse(ResponseEntity.notFound().build());

  private static Function<Long, Function<Throwable, ResponseEntity>> handleGetUserFailure = id -> throwable -> {
    log.error(String.format("Unable to retrieve user for id: %s", id), throwable);
    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();

  };


  @PostMapping("/find")
  public ResponseEntity findAllUsers(@Valid @RequestBody SearchValue str) {
    return Optional.of(ResponseEntity.ok().body(userService.findUsersBySearch(str.getSearch())))
            .orElse(ResponseEntity.notFound().build());
  }

  @PostMapping
  public ResponseEntity updateUser(@Valid @RequestPart("firstName") String firstName,
                                   @RequestPart("lastName") String lastName,
                                   @RequestPart("address") String address,
                                   @RequestPart("dateBirthday") String dateBirthday,
                                   @RequestPart(value = "file", required = false) MultipartFile file)
          throws IOException {
    userService.updateUserWithStringsAndFile(firstName, lastName, address, dateBirthday, file);
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
    return ResponseEntity.status(200).body(PostToFront.convertListPostsToResponse(userService.getFavoritesById(id)));
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

  @GetMapping("/notification")
  public ResponseEntity getNotification() {
    return ResponseEntity.status(200).body(userService.getAllNotificationByUser());
  }

  @PostMapping("/updatePassword")
  public ResponseEntity updatePasswordFromUpdatePasswordForm(@Valid @RequestBody FieldFromFront field) {
    return ResponseEntity.accepted()
            .body(ResponseToFront
                    .convertResponseToFront(
                            userService.updatePasswordInitByUser(
                                    field.getOldPassword(),
                                    field.getNewPassword())));
  }
}
