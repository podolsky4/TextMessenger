package com.textmessenger.model.entity;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.time.LocalDateTime;

/* Abstract base class for all entities
   It stores common fields for the entities
 */

@MappedSuperclass
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
