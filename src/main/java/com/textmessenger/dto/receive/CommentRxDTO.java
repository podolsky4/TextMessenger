package com.textmessenger.dto.receive;

import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

@Data
public class CommentRxDTO {

  private long id;

  @Length(min = 1, max = 255)
  private String content;

  @NotNull
  @Valid
  private UserRxDTO commentator;

  @NotNull
  @Valid
  private PostRxDTO post;
}
