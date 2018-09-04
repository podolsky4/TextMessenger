package com.textmessenger.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import java.util.Date;

@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "temporary_token")
@Data
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@EntityListeners(AuditingEntityListener.class)
public class TemporaryToken extends BaseEntity {
  public static final int EXPIRATION = 86400000;

  @Column(name = "token")
  private String token;

  @OneToOne
  @JoinColumn(name = "user_id")
  private User user;

  @Column(name = "expiry_date")
  private Date expiryDate;

  public Date calculateExpiryDate() {
    return new Date(new Date().getTime() + EXPIRATION);
  }
}
