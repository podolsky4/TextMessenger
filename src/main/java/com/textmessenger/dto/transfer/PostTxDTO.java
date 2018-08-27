package com.textmessenger.dto.transfer;

import com.fasterxml.jackson.annotation.JsonView;
import com.textmessenger.dto.view.PostView;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class PostTxDTO {

  @JsonView(PostView.PostId.class)
  private long id;

  @JsonView(PostView.PostContent.class)
  private String content;

  @JsonView(PostView.PostParentId.class)
  private long parentId;

  @JsonView(PostView.PostUser.class)
  private UserTxDTO user;

  @JsonView(PostView.PostComments.class)
  private List<CommentTxDTO> comments = new ArrayList<>();

  @JsonView(PostView.PostLikers.class)
  private List<UserTxDTO> likers = new ArrayList<>();

}
