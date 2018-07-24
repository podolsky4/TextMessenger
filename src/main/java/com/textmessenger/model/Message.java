package com.textmessenger.model;

import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
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
@Table(name = "message")
@Data
@EntityListeners(AuditingEntityListener.class)
public class Message {

      @Id
      @GeneratedValue(strategy = GenerationType.AUTO)
      @Column(name = "message_id")
      private long id;

      @Column(name = "message_content")
      private String content;

      @ManyToOne
      @JoinColumn(name = "dialog_id")
      private Dialog dialog;

      @ManyToOne
      @JoinColumn(name = "user_id")
      private User user;

      @Column(nullable = false, updatable = false)
      @Temporal(TemporalType.TIMESTAMP)
      @CreatedDate
      private Date createdDate;

      @Column(nullable = false)
      @Temporal(TemporalType.TIMESTAMP)
      @LastModifiedDate
      private Date updatedDate;
}
