package com.textmessenger.service;

import com.textmessenger.dto.transfer.NotificationTxDTO;
import com.textmessenger.model.entity.User;

public interface NotificationService {
  NotificationTxDTO createNotification(String type, User user, Long id);
}
