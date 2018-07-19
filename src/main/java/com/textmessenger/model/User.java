package com.textmessenger.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Data
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Basic
  private int id;
  @Column
  private String login;
  @Column
  private String email;

  @Basic
  private LocalDateTime regdate;
  @Column
  @JsonIgnore
  private String password;
  @Column
  private String gender;

  public User() {
  }
}
