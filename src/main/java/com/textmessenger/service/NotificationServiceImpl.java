package com.textmessenger.service;

import com.textmessenger.dto.receive.UserRxDto;
import com.textmessenger.dto.transfer.NotificationTxDto;
import com.textmessenger.mapper.NotificationMapper;
import com.textmessenger.mapper.UserMapper;
import com.textmessenger.model.entity.Notification;
import com.textmessenger.repository.NotificationRepository;
import org.springframework.stereotype.Service;

@Service
public class NotificationServiceImpl implements NotificationService {
  private final NotificationRepository notificationRepository;
  private final NotificationMapper notificationMapper;
  private final UserMapper userMapper;

  NotificationServiceImpl(NotificationRepository notificationRepository, NotificationMapper notificationMapper,
                          UserMapper userMapper) {
    this.notificationRepository = notificationRepository;
    this.notificationMapper = notificationMapper;
    this.userMapper = userMapper;
  }

  @Override
  public NotificationTxDto createNotification(String type, UserRxDto user, Long id) {
    Notification notification = new Notification();
    notification.setContentId(id);
    notification.setUser(userMapper.userRxDtoToUser(user));
    notification.setType(type);
    return notificationMapper.notToNotTxDto(notificationRepository.save(notification));

  }

}
