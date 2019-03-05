package com.textmessenger.service;

import com.textmessenger.model.entity.Dialog;
import com.textmessenger.model.entity.Post;
import com.textmessenger.model.entity.User;

public interface NotificationService {

  void createSome(String type, User toUser, User fromUser, Post post);

  void createSome(String type, User toUser, User fromUser, Dialog dialog);

  void createSome(String type, User toUser, User fromUser);

  void updateNotificationStatus(long id);

  void deleteNotificationById(long id);

  void updateAllNotification(User user);
}
