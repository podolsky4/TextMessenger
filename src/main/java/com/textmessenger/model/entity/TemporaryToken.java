package com.textmessenger.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;
import java.util.Date;

@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "temporary_token")
@Data
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@EntityListeners(AuditingEntityListener.class)
public class TemporaryToken extends BaseEntity{
  private static final int EXPIRATION = 60*24;

  @Column(name = "token")
  private String token;

  @OneToOne(targetEntity = User.class, fetch = FetchType.EAGER)
  //@JoinColumn(nullable = false, name = "user_id")
  @PrimaryKeyJoinColumn
  private User user;

  @Column(name = "expiry_date")
  private Date expiryDate;
}
