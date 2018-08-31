package com.textmessenger.dto.receive;

import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Past;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
public class UserRxDto {

  private long id;

  @Length(min = 3, max = 60)
  @NotNull
  private String login;

  @Email
  @NotNull
  private String email;

  @Length(min = 6, max = 60)
  @NotNull
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

  private List<PostRxDto> posts = new ArrayList<>();

  private List<CommentRxDto> comments = new ArrayList<>();

  private List<DialogRxDto> dialogs = new ArrayList<>();

  private List<PostRxDto> favorites = new ArrayList<>();

  private List<UserRxDto> followers = new ArrayList<>();

  private List<NotificationRxDto> notifications = new ArrayList<>();

  private List<UserRxDto> following = new ArrayList<>();
}
