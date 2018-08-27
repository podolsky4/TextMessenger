package com.textmessenger.dto.transfer;

import lombok.Data;

import javax.persistence.Column;
import java.time.LocalDate;

@Data
public class UserTxDTO {

  private String login;

  private String email;

  private String password;

  private String firstName;

  private String lastName;

  private String address;

  private String profilePhoto;

  private String profileHeader;

  private LocalDate dateBirthday;

}
