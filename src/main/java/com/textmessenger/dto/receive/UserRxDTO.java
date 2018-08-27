package com.textmessenger.dto.receive;

import com.fasterxml.jackson.annotation.JsonView;
import com.textmessenger.dto.view.UserView;
import lombok.Data;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
public class UserRxDTO {

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

  private List<PostRxDTO> posts = new ArrayList<>();

  private List<CommentRxDTO> comments = new ArrayList<>();

  private List<DialogRxDTO> dialogs = new ArrayList<>();

  private List<PostRxDTO> favorites = new ArrayList<>();

  private List<UserRxDTO> followers = new ArrayList<>();

  private List<NotificationRxDTO> notifications = new ArrayList<>();

  private List<UserRxDTO> following = new ArrayList<>();
}
