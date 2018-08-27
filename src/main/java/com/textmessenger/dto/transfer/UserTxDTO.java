package com.textmessenger.dto.transfer;

import lombok.Data;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
public class UserTxDTO {

  private long id;

  private String login;

  private String email;

  private String password;

  private String firstName;

  private String lastName;

  private String address;

  private String profilePhoto;

  private String profileHeader;

  private LocalDate dateBirthday;

  private List<PostTxDTO> posts = new ArrayList<>();

  private List<CommentTxDTO> comments = new ArrayList<>();

  private List<DialogTxDTO> dialogs = new ArrayList<>();

  private List<PostTxDTO> favorites = new ArrayList<>();

  private List<UserTxDTO> followers = new ArrayList<>();

  private List<NotificationTxDTO> notifications = new ArrayList<>();

  private List<UserTxDTO> following = new ArrayList<>();
}
