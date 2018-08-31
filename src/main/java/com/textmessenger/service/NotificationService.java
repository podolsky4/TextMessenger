package com.textmessenger.service;

import com.textmessenger.dto.receive.UserRxDto;
import com.textmessenger.dto.transfer.NotificationTxDto;

public interface NotificationService {
  NotificationTxDto createNotification(String type, UserRxDto user, Long id);
}
