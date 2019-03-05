package com.textmessenger.repository;

import com.textmessenger.model.entity.Notification;
import com.textmessenger.model.entity.NotificationStatus;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@DataJpaTest
public class NotificationRepositoryTest {

  @Autowired
  private NotificationRepository notificationRepository;

  @Autowired
  private TestEntityManager entityManager;

  @Test
  public void findAllNotification() {
    List<Notification> all = notificationRepository.findAll();
    int allNot = all.size();
    assertThat(all).hasSize(allNot);
  }

  public Notification setNotification() {
    Notification notification = new Notification();
    notification.setChecked(true);
    notification.setContentId(1);
    notification.setType(NotificationStatus.MESSAGE.toString());
    return entityManager.persist(notification);
  }

}
