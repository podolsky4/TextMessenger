package com.textmessenger.model;

import lombok.Data;

import javax.persistence.*;

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
