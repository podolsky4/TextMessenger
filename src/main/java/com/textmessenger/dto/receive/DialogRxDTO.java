package com.textmessenger.dto.receive;

import lombok.Data;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Data
public class DialogRxDTO {

  private long id;

  @NotNull
  @Valid
  private List<MessageRxDTO> messages = new ArrayList<>();

  @NotNull
  @Valid
  private List<UserRxDTO> users = new ArrayList<>();
}
