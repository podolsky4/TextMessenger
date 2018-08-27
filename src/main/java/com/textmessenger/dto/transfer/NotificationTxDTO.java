package com.textmessenger.dto.transfer;

import com.fasterxml.jackson.annotation.JsonView;
import com.textmessenger.dto.view.NotificationView;
import lombok.Data;

@Data
public class NotificationTxDTO {

  @JsonView(NotificationView.NotificationId.class)
  private long id;

  @JsonView(NotificationView.NotificationIsChecked.class)
  private boolean isChecked;

  @JsonView(NotificationView.NotificationContendId.class)
  private long contentId;

  @JsonView(NotificationView.NotificationType.class)
  private String type;

  @JsonView(NotificationView.NotificationUser.class)
  private UserTxDTO user;

}
