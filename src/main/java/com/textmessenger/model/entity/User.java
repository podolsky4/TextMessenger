package com.textmessenger.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "user")
@Data
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@EntityListeners(AuditingEntityListener.class)
public class User extends BaseEntity {

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

  @OneToMany(mappedBy = "user")
  @JsonIgnore
  private List<Post> posts = new ArrayList<>();

  @OneToMany(mappedBy = "commentator")
  @JsonIgnore
  private List<Comment> comments = new ArrayList<>();

  @ManyToMany(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
  @JoinTable(name = "user_dialog",
          joinColumns = {@JoinColumn(name = "user_id")},
          inverseJoinColumns = {@JoinColumn(name = "dialog_id")})
  //@JsonIgnoreProperties(value = "users", allowSetters = true)
  @JsonIgnore
  private List<Dialog> dialogs = new ArrayList<>();

  @ManyToMany(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
  @JoinTable(name = "favorites",
          joinColumns = {@JoinColumn(name = "user_id")},
          inverseJoinColumns = {@JoinColumn(name = "post_id")})
  @JsonIgnore
  private List<Post> favorites = new ArrayList<>();

  @ManyToMany
  @JoinTable(name = "user_rel",
          joinColumns = {@JoinColumn(name = "following_id")},
          inverseJoinColumns = {@JoinColumn(name = "follower_id")})
  @JsonIgnore
  private List<User> followers = new ArrayList<>();

  @ManyToMany
  @JoinTable(name = "user_rel",
          joinColumns = {@JoinColumn(name = "follower_id")},
          inverseJoinColumns = {@JoinColumn(name = "following_id")})
  @JsonIgnore
  private List<User> following = new ArrayList<>();

  @Override
  public String toString() {
    return "User{" +
            "login='" + login + '\'' +
            ", email='" + email + '\'' +
            ", password='" + password + '\'' +
            ", firstName='" + firstName + '\'' +
            ", lastName='" + lastName + '\'' +
            ", address='" + address + '\'' +
            ", profilePhoto='" + profilePhoto + '\'' +
            ", profileHeader='" + profileHeader + '\'' +
            ", dateBirthday=" + dateBirthday +
            '}';
  }
}