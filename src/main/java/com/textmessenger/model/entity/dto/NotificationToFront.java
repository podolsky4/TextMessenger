package com.textmessenger.model.entity.dto;

import com.textmessenger.model.entity.WebSocketType;
import com.textmessenger.model.entity.Notification;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
public class NotificationToFront {
  private long id;//NOSONAR
  private PostToFront post;//NOSONAR
  private String type;//NOSONAR
  private boolean status;//NOSONAR
  private DialogToFront dialog;//NOSONAR
  private UserToFrontShort toUser;//NOSONAR
  private UserToFrontShort fromUser;//NOSONAR
  private LocalDateTime createdDate;//NOSONAR
  private LocalDateTime updatedDate;//NOSONAR

  public static NotificationToFront convertNotificationToFront(Notification notification) {
    NotificationToFront response = new NotificationToFront();
    response.setType(notification.getType());
    response.setId(notification.getId());
    response.setCreatedDate(notification.getCreatedDate());
    response.setToUser(UserToFrontShort.convertUserForFront(notification.getUser()));
    response.setFromUser(UserToFrontShort.convertUserForFront(notification.getFrom()));
    response.setStatus(notification.isChecked());

    if (notification.getType().equals(WebSocketType.NEW_COMMENT.toString())
            || notification.getType().equals(WebSocketType.NEW_RETWEET.toString())
            || notification.getType().equals(WebSocketType.NEW_LIKE.toString())) {
      notification.getUser().getPosts().forEach(post1 -> {
        if (post1.getId() == notification.getContentId()) {
          response.setPost(PostToFront.convertPostToFront(post1));
        }
      });

    } else if (notification.getType().equals(WebSocketType.NEW_POST.toString())) {
      notification.getFrom().getPosts().forEach(post1 -> {
        if (post1.getId() == notification.getContentId()) {
          response.setPost(PostToFront.convertPostToFront(post1));
        }
      });

    } else if (notification.getType().equals(WebSocketType.NEW_DIALOG.toString())
            || notification.getType().equals(WebSocketType.ADD_TO_DIALOG.toString())
            || notification.getType().equals(WebSocketType.NEW_MESSAGE.toString())) {
      notification.getUser().getDialogs().forEach(dialog -> {
        if (dialog.getId() == notification.getContentId()) {
          response.setDialog(DialogToFront.convertDialogToFront(dialog));
        }
      });
    }

    return response;
  }

  public static List<NotificationToFront> convertListNotificationToFront(List<Notification> list) {
    List<NotificationToFront> res = new ArrayList<>();
    list.forEach(notification -> res.add(convertNotificationToFront(notification)));
    return res;
  }
}
