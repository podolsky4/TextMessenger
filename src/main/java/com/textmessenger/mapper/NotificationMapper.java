package com.textmessenger.mapper;

import com.textmessenger.dto.receive.NotificationRxDTO;
import com.textmessenger.dto.transfer.NotificationTxDTO;
import com.textmessenger.model.entity.Notification;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface NotificationMapper {

  NotificationRxDTO notToNotRxDto(Notification notification);

  List<NotificationRxDTO> notsToNotRxDtos(List<Notification> notifications);

  NotificationTxDTO notToNotTxDto(Notification notification);

  List<NotificationTxDTO> notsToNotTxDtos(List<Notification> notifications);

  Notification notRxDtoToNot(NotificationRxDTO notificationRxDto);

  List<Notification> notRxDtosToNots(List<NotificationRxDTO> notificationRxDtos);

  Notification notTxDtoToNot(NotificationTxDTO notificationTxDto);

  List<Notification> notTxDtosToNots(List<NotificationTxDTO> notificationTxDtos);

}
