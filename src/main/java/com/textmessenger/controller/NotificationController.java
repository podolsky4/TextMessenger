package com.textmessenger.controller;

import com.textmessenger.model.entity.User;
import com.textmessenger.service.NotificationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/notification")
public class NotificationController {

  private final NotificationService notificationService;

  NotificationController(NotificationService notificationService) {
    this.notificationService = notificationService;
  }

  @PostMapping("/{id}")
  public ResponseEntity updateNotificationStatus(@PathVariable("id") long id) {
    notificationService.updateNotificationStatus(id);
    return ResponseEntity.accepted().build();
  }

  @DeleteMapping("/{id}")
  public ResponseEntity deleteNotifactionById(@PathVariable("id") long id) {
    notificationService.deleteNotificationById(id);
    return ResponseEntity.accepted().build();
  }

  @PostMapping("/notifications")
  public ResponseEntity setAllNotificationAsRead(@RequestBody User user) {
    notificationService.updateAllNotification(user);
    return ResponseEntity.accepted().build();
  }
}
