package com.textmessenger.dto.receive;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class PostRxDTO {

  private long id;

  private String content;

  private long parentId;

  private UserRxDTO user;

  private List<CommentRxDTO> comments = new ArrayList<>();

  private List<UserRxDTO> likers = new ArrayList<>();
}
