package com.textmessenger.dto.receive;

import lombok.Data;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Data
public class DialogRxDto {

  private long id;

  @NotNull
  @Valid
  private List<MessageRxDto> messages = new ArrayList<>();

  @NotNull
  @Valid
  private List<UserRxDto> users = new ArrayList<>();
}
