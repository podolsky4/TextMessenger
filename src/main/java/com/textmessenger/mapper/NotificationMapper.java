package com.textmessenger.mapper;

import com.textmessenger.dto.receive.NotificationRxDTO;
import com.textmessenger.dto.transfer.NotificationTxDTO;
import com.textmessenger.model.entity.Notification;
import org.mapstruct.Mapper;

@Mapper
public interface NotificationMapper {

  NotificationRxDTO notToNotRxDto(Notification notification);

  NotificationTxDTO notToNotTxDto(Notification notification);

  Notification notRxDtoToNot(NotificationRxDTO notificationRxDTO);

  Notification notTxDtoToNot(NotificationTxDTO notificationTxDTO);

}
