package com.textmessenger.model;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.List;

@Entity
@Table(name = "users")
@Data
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "user_id")
  private long id;

  @Column(name = "name")
  private String name;

  @Column(name = "user_name")
  private String userName;

  @Column(name = "surname")
  private String surname;

  @Column(name = "email")
  private String email;

  @Column(name = "password")
  private char[] password;

  @OneToMany(mappedBy = "from")
  private List<Message> messagesRecieved;

  @OneToMany(mappedBy = "to")
  private List<Message> messagesSended;

  @OneToMany(mappedBy = "user")
  private List<Post> posts;


}
