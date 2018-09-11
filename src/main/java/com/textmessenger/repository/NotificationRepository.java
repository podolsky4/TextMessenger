package com.textmessenger.repository;

import com.textmessenger.model.entity.Notification;
import com.textmessenger.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
}
