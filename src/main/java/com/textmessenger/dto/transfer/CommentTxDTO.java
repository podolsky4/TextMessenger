package com.textmessenger.dto.transfer;

import com.fasterxml.jackson.annotation.JsonView;
import com.textmessenger.dto.view.CommentView;
import lombok.Data;

@Data
public class CommentTxDTO {

  @JsonView(CommentView.CommentId.class)
  private long id;

  @JsonView(CommentView.CommentContent.class)
  private String content;

  @JsonView(CommentView.CommentCommentator.class)
  private UserTxDTO commentator;

  @JsonView(CommentView.CommentPost.class)
  private PostTxDTO post;

}
