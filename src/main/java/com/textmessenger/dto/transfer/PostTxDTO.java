package com.textmessenger.dto.transfer;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class PostTxDTO {
  private long id;

  private String content;

  private Long parentId;

  private UserTxDTO user;

  private List<CommentTxDTO> comments = new ArrayList<>();

  private List<UserTxDTO> likers = new ArrayList<>();
}
