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
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "dialog")
@Data
@EntityListeners(AuditingEntityListener.class)
public class Dialog {

      @Id
      @GeneratedValue(strategy = GenerationType.IDENTITY)
      @Column(name = "dialog_id")
      private long id;

      @OneToMany(mappedBy = "dialog")
      private List<Message> messages;

      @ManyToMany(mappedBy = "dialogs")
      private List<User> users;

      @Column(nullable = false, updatable = false)
      @Temporal(TemporalType.TIMESTAMP)
      @CreatedDate
      private Date createdDate;

      @Column(nullable = false)
      @Temporal(TemporalType.TIMESTAMP)
      @LastModifiedDate
      private Date updatedDate;
}
