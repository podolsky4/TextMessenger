package com.textmessenger.model.entity;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import java.time.LocalDateTime;

/* Abstract base class for all entities
   It stores common fields for the entities
 */

@MappedSuperclass
@Data
abstract class BaseEntity {

  // Primary key for entity
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  // Jpa audit time
  @Column(name = "created_at")
  @CreatedDate
  private LocalDateTime createdDate;

  @Column(name = "last_update")
  @LastModifiedDate
  private LocalDateTime updatedDate;
}
