package com.textmessenger.dto.transfer;

import com.fasterxml.jackson.annotation.JsonView;
import com.textmessenger.dto.view.DialogView;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class DialogTxDTO {

  @JsonView(DialogView.DialogId.class)
  private long id;

  @JsonView(DialogView.DialogMessages.class)
  private List<MessageTxDTO> messages = new ArrayList<>();

  @JsonView(DialogView.DialogUsers.class)
  private List<UserTxDTO> users = new ArrayList<>();

}
