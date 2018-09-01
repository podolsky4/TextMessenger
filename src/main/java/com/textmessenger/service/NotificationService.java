package com.textmessenger.service;

import com.textmessenger.model.entity.Notification;
import com.textmessenger.model.entity.User;

public interface NotificationService {
  Notification createNotification(String type, User user, Long id);
}
