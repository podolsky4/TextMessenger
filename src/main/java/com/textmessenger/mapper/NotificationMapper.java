package com.textmessenger.mapper;

import com.textmessenger.dto.receive.NotificationRxDTO;
import com.textmessenger.dto.transfer.NotificationTxDTO;
import com.textmessenger.model.entity.Notification;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface NotificationMapper {

  NotificationMapper INSTANCE = Mappers.getMapper(NotificationMapper.class);

  NotificationRxDTO notToNotRxDto(Notification notification);

  NotificationTxDTO notToNotTxDto(Notification notification);

  Notification notRxDtoToNot(NotificationRxDTO notificationRxDTO);

  Notification notTxDtoToNot(NotificationTxDTO notificationTxDTO);

}
