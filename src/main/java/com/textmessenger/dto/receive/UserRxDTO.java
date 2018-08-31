package com.textmessenger.dto.receive;

import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Email;
import javax.validation.constraints.Past;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
public class UserRxDTO {

  private long id;

  @Length(min = 3, max = 60)
  private String login;

  @Email
  private String email;

  @Length(min = 6, max = 60)
  private String password;

  @Length(max = 60)
  private String firstName;

  @Length(max = 60)
  private String lastName;

  @Length(max = 255)
  private String address;

  @Length(max = 200)
  private String profilePhoto;

  @Length(max = 200)
  private String profileHeader;

  @Past
  private LocalDate dateBirthday;

  private List<PostRxDTO> posts = new ArrayList<>();

  private List<CommentRxDTO> comments = new ArrayList<>();

  private List<DialogRxDTO> dialogs = new ArrayList<>();

  private List<PostRxDTO> favorites = new ArrayList<>();

  private List<UserRxDTO> followers = new ArrayList<>();

  private List<NotificationRxDTO> notifications = new ArrayList<>();

  private List<UserRxDTO> following = new ArrayList<>();
}
