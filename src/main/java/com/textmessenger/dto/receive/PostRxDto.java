package com.textmessenger.dto.receive;

import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Data
public class PostRxDto {

  private long id;

  @Length(min = 1, max = 280)
  private String content;

  private long parentId;

  @NotNull
  @Valid
  private UserRxDto user;

  private List<CommentRxDto> comments = new ArrayList<>();

  private List<UserRxDto> likers = new ArrayList<>();
}
