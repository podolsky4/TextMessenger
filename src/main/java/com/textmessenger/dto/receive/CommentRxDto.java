package com.textmessenger.dto.receive;

import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

@Data
public class CommentRxDto {

  private long id;

  @Length(min = 1, max = 255)
  private String content;

  @NotNull
  @Valid
  private UserRxDto commentator;

  @NotNull
  @Valid
  private PostRxDto post;
}
