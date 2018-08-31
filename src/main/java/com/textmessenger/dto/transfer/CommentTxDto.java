package com.textmessenger.dto.transfer;

import lombok.Data;

@Data
public class CommentTxDto {

  private long id;

  private String content;

  private UserTxDto commentator;

  private PostTxDto post;

}
