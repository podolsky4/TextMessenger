package com.textmessenger.dto.transfer;

import com.fasterxml.jackson.annotation.JsonView;
import com.textmessenger.dto.view.UserView;
import lombok.Data;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
public class UserTxDTO {

  @JsonView(UserView.UserId.class)
  private long id;

  @JsonView(UserView.UserLogin.class)
  private String login;

  @JsonView(UserView.UserEmail.class)
  private String email;

  @JsonView(UserView.UserPassword.class)
  private String password;

  @JsonView(UserView.UserFirstName.class)
  private String firstName;

  @JsonView(UserView.UserLastName.class)
  private String lastName;

  @JsonView(UserView.UserAddress.class)
  private String address;

  @JsonView(UserView.UserProfilePhoto.class)
  private String profilePhoto;

  @JsonView(UserView.UserProfileHeader.class)
  private String profileHeader;

  @JsonView(UserView.UserDateBirthday.class)
  private LocalDate dateBirthday;

  @JsonView(UserView.UserPosts.class)
  private List<PostTxDTO> posts = new ArrayList<>();

  @JsonView(UserView.UserComments.class)
  private List<CommentTxDTO> comments = new ArrayList<>();

  @JsonView(UserView.UserDialogs.class)
  private List<DialogTxDTO> dialogs = new ArrayList<>();

  @JsonView(UserView.UserFavorites.class)
  private List<PostTxDTO> favorites = new ArrayList<>();

  @JsonView(UserView.UserFollowers.class)
  private List<UserTxDTO> followers = new ArrayList<>();

  @JsonView(UserView.UserNotifications.class)
  private List<NotificationTxDTO> notifications = new ArrayList<>();

  @JsonView(UserView.UserFollowing.class)
  private List<UserTxDTO> following = new ArrayList<>();
}
