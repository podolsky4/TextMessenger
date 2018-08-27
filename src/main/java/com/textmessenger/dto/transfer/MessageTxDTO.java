package com.textmessenger.dto.transfer;

import com.fasterxml.jackson.annotation.JsonView;
import com.textmessenger.dto.view.MessageView;
import lombok.Data;

@Data
public class MessageTxDTO {

  @JsonView(MessageView.MessageId.class)
  private long id;

  @JsonView(MessageView.MessageContent.class)
  private String content;

  @JsonView(MessageView.MessageDialog.class)
  private DialogTxDTO dialog;

  @JsonView(MessageView.MessageUser.class)
  private UserTxDTO user;

}
