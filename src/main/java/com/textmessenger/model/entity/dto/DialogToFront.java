package com.textmessenger.model.entity.dto;

import com.textmessenger.model.entity.Dialog;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
public class DialogToFront {
  private long id;
  private List<MessageToFront> messages;
  private List<UserToFrontShort> users;
  private LocalDateTime createdDate;
  private LocalDateTime updatedDate;


  public static DialogToFront convertDialogToFront(Dialog dialog) {
    DialogToFront dialogToFront = new DialogToFront();
    dialogToFront.setId(dialog.getId());
    dialogToFront.setMessages(MessageToFront.convertMessagesListToResponse(dialog.getMessages()));
    dialogToFront.setUsers(UserToFrontShort.convertListUsersForFront(dialog.getUsers()));
    dialogToFront.setCreatedDate(dialog.getCreatedDate());
    if (dialog.getUpdatedDate() != null) {
      dialogToFront.setUpdatedDate(dialog.getUpdatedDate());
    }
    return dialogToFront;
  }

  public static List<DialogToFront> convertDialogsListToResponse(List<Dialog> dialogList) {
    List<DialogToFront> res = new ArrayList<>();
    dialogList.stream().forEach(dialog -> res.add(convertDialogToFront(dialog)));
    return res;
  }
}
