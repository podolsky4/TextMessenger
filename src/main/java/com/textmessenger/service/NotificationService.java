package com.textmessenger.service;

import com.textmessenger.dto.receive.UserRxDTO;
import com.textmessenger.dto.transfer.NotificationTxDTO;
import com.textmessenger.model.entity.User;

public interface NotificationService {
  NotificationTxDTO createNotification(String type, UserRxDTO user, Long id);
}
