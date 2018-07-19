package com.textmessenger.model;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "messages")
@Data
public class Message {

  @Id
  private long id;

  @Column(name = "from_user")
  private User from;

  @Column(name = "to_user")
  private User to;

  @Column(name = "message")
  private String message;
}
