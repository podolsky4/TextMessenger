package com.textmessenger.service;

import com.textmessenger.model.entity.Notification;
import com.textmessenger.model.entity.Post;
import com.textmessenger.model.entity.User;

public interface NotificationService {
  Notification createNotification(Post post, User user);

  void updateNotification(Long id);
}
