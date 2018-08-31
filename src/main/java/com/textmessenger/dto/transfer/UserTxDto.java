package com.textmessenger.dto.transfer;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonView;
import com.textmessenger.dto.view.UserView;
import lombok.Data;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
public class UserTxDto {

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
  private List<PostTxDto> posts = new ArrayList<>();

  @JsonIgnore
  private List<CommentTxDto> comments = new ArrayList<>();

  @JsonIgnore
  private List<DialogTxDto> dialogs = new ArrayList<>();

  @JsonIgnore
  private List<PostTxDto> favorites = new ArrayList<>();

  @JsonView(UserView.UserFull.class)
  private List<UserTxDto> followers = new ArrayList<>();

  @JsonIgnore
  private List<NotificationTxDto> notifications = new ArrayList<>();

  @JsonView(UserView.UserFull.class)
  private List<UserTxDto> following = new ArrayList<>();

}
