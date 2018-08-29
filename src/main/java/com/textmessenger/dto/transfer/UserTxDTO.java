package com.textmessenger.dto.transfer;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonView;
import com.textmessenger.dto.view.UserView;
import lombok.Data;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
public class UserTxDTO {

  @JsonView(UserView.UserBaseId.class)
  private long id;

  @JsonView(UserView.UserShort.class)
  private String login;

  @JsonView(UserView.UserShort.class)
  private String email;

  @JsonIgnore
  private String password;

  @JsonView(UserView.UserProfile.class)
  private String firstName;

  @JsonView(UserView.UserProfile.class)
  private String lastName;

  @JsonView(UserView.UserProfile.class)
  private String address;

  @JsonView(UserView.UserProfile.class)
  private String profilePhoto;

  @JsonView(UserView.UserProfile.class)
  private String profileHeader;

  @JsonView(UserView.UserProfile.class)
  private LocalDate dateBirthday;

  @JsonIgnore
  private List<PostTxDTO> posts = new ArrayList<>();

  @JsonIgnore
  private List<CommentTxDTO> comments = new ArrayList<>();

  @JsonIgnore
  private List<DialogTxDTO> dialogs = new ArrayList<>();

  @JsonIgnore
  private List<PostTxDTO> favorites = new ArrayList<>();

  @JsonView(UserView.UserFull.class)
  private List<UserTxDTO> followers = new ArrayList<>();

  @JsonIgnore
  private List<NotificationTxDTO> notifications = new ArrayList<>();

  @JsonView(UserView.UserFull.class)
  private List<UserTxDTO> following = new ArrayList<>();

}
