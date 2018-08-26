package com.textmessenger.service;

import com.textmessenger.model.entity.Notification;
import com.textmessenger.model.entity.Post;
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
  public Notification createNotification(Post post, User user) {
    Notification notification = new Notification();
    notification.setContent(post.getContent());
    notification.setContent_id(post.getId());
    notification.setUser(user);
    notification.setType("POST");
    return notificationRepository.save(notification);

  }

  @Override
  public void updateNotification(Long id) {

  }
}
