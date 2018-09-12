package com.textmessenger.service;

import com.textmessenger.model.entity.Dialog;
import com.textmessenger.model.entity.Notification;
import com.textmessenger.model.entity.Post;
import com.textmessenger.model.entity.User;

public interface NotificationService {
  Notification createNotification(String type, User toUser, User fromUser, Long contentId);

  void createSome(String type, User toUser, User fromUser, Post post);

  void createSome(String type, User toUser, User fromUser, Dialog dialog);

  void createSome(String type, User toUser, User fromUser);
}
