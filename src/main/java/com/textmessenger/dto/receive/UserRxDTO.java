package com.textmessenger.dto.receive;

import lombok.Data;

import javax.persistence.Column;
import java.time.LocalDate;

@Data
public class UserRxDTO {

  @Column(name = "login")
  private String login;

  @Column(name = "email")
  private String email;

  @Column(name = "password")
  private String password;

  @Column(name = "first_name")
  private String firstName;

  @Column(name = "last_name")
  private String lastName;

  @Column(name = "address")
  private String address;

  @Column(name = "profile_photo")
  private String profilePhoto;

  @Column(name = "profile_header")
  private String profileHeader;

  @Column(name = "birthday")
  private LocalDate dateBirthday;
}
