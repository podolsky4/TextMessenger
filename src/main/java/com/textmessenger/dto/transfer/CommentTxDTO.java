package com.textmessenger.dto.transfer;

import lombok.Data;

@Data
public class CommentTxDTO {

  private long id;

  private String content;

  private UserTxDTO commentator;

  private PostTxDTO post;

}
