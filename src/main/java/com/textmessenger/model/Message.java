package com.textmessenger.model;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

@Entity
@Table(name = "messages")
@Data
public class Message {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "message_id")
  private long id;

  @Column(name = "from_user")
  private User from;

  @Column(name = "to_user")
  private User to;

  @Column(name = "message")
  private String message;

  @Column(name = "created_date")
  private Date date;
}
