package com.textmessenger.dto.transfer;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class PostTxDto {

  private long id;

  private String content;

  private long parentId;

  private UserTxDto user;

  private List<CommentTxDto> comments = new ArrayList<>();

  private List<UserTxDto> likers = new ArrayList<>();

}
