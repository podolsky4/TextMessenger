package com.textmessenger.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "notification")
@Data
@AllArgsConstructor
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Notification extends BaseEntity {

  @Column(name = "is_checked")
  private boolean isChecked;

  @Column(name = "content_id")
  private long contentId;

  @Column(name = "type")
  private String type;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_to")
  @JsonIgnoreProperties(allowSetters = true)
  private User user;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_from")
  @JsonIgnoreProperties(allowSetters = true)
  private User from;

  public Notification(boolean isChecked, String type, User user, User from) {
    this.isChecked = isChecked;
    this.type = type;
    this.user = user;
    this.from = from;
  }
}