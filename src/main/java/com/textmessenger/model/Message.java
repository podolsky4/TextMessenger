package com.textmessenger.model;

import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.util.Date;

@Entity
@Table(name = "messages")
@Data
@EntityListeners(AuditingEntityListener.class)
public class Message {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "message_id")
  private long id;

  @ManyToOne
  @JoinColumn(name = "from")
  private User from;

  @ManyToOne
  @JoinColumn(name = "to")
  private User to;

  @Column(name = "message")
  private String message;

  @Column(name = "created_date")
  @Temporal(TemporalType.TIMESTAMP)
  @CreatedDate
  private Date date;
}
