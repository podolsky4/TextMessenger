package com.textmessenger.service;

import com.textmessenger.mapper.NotificationMapper;
import com.textmessenger.model.entity.Notification;
import com.textmessenger.model.entity.User;
import com.textmessenger.repository.NotificationRepository;
import org.springframework.stereotype.Service;

@Service
public class NotificationServiceImpl implements NotificationService {
  private final NotificationRepository notificationRepository;

  private final NotificationMapper notificationMapper;

  NotificationServiceImpl(NotificationRepository notificationRepository, NotificationMapper notificationMapper) {
    this.notificationRepository = notificationRepository;
    this.notificationMapper = notificationMapper;
  }

  @Override
  public Notification createNotification(String type, User user, Long id) {
    Notification notification = new Notification();
    notification.setContentId(id);
    notification.setUser(user);
    notification.setType(type);
    return notificationRepository.save(notification);

  }

}
