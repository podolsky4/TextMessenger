package com.textmessenger.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "user")
@Data
@EntityListeners(AuditingEntityListener.class)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "user_id")
  private long id;

  @Column(name = "user_login")
  private String login;

  @Column(name = "user_email")
  private String email;

  @Column(name = "user_password")
  private String password;

  @Column(name = "user_first_name")
  private String firstName;

  @Column(name = "user_last_name")
  private String lastName;

  @Column(name = "user_address")
  private String address;

  @Column(name = "user_profile_photo")
  private String profilePhoto;

  @Column(name = "user_profile_header")
  private String profileHeader;

  @Column(name = "user_date_birthday")
  private Date dateBirthday;

  @OneToMany(mappedBy = "user")
  @JsonIgnore
  private List<Post> posts;


  @ManyToMany
  @JoinTable(name = "user_dialog",
          joinColumns = {@JoinColumn(name = "user_id")},
          inverseJoinColumns = {@JoinColumn(name = "dialog_id")})
  @JsonIgnore
  private List<Dialog> dialogs;

  @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
  @JoinTable(name = "favorites",
          joinColumns = {@JoinColumn(name = "user_id", nullable = false, updatable = false)},
          inverseJoinColumns = {@JoinColumn(name = "post_id", nullable = false, updatable = false)})
  @JsonIgnore
  private List<Post> favorites;

  @Column(name = "created_date", nullable = false, updatable = false)
  @Temporal(TemporalType.TIMESTAMP)
  @CreatedDate
  private Date createdDate;

  @Column(name = "last_update", nullable = false)
  @Temporal(TemporalType.TIMESTAMP)
  @LastModifiedDate
  private Date updatedDate;
}