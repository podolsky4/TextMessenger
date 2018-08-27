package com.textmessenger.dto.receive;

import lombok.Data;

@Data
public class CommentRxDTO {

  private long id;

  private String content;

  private UserRxDTO commentator;

  private PostRxDTO post;
}
