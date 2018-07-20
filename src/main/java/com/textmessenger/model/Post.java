package com.textmessenger.model;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.JoinColumn;

@Entity
@Data
@Table(name = "posts")
public class Post {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "post_id")
  long id;

  @Column(name = "context_article")
  String contextArticle;

  @Column(name = "data_article")
  String dataArticle;

  @ManyToOne
  @JoinColumn(name = "posts")
  private User user;
}
