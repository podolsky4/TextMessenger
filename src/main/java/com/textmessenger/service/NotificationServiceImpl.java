package com.textmessenger.service;


import com.textmessenger.model.entity.Notification;
import com.textmessenger.model.entity.User;
import com.textmessenger.repository.NotificationRepository;
import org.springframework.stereotype.Service;

@Service
public class NotificationServiceImpl implements NotificationService {
  private final NotificationRepository notificationRepository;


  NotificationServiceImpl(NotificationRepository notificationRepository) {
    this.notificationRepository = notificationRepository;
  }


  @Override
  public Notification createNotification(String type, User toUser, User fromUser, Long contentId) {
    return notificationRepository.save(new Notification(false, contentId, type, toUser, fromUser));
  }
}
