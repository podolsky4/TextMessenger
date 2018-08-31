package com.textmessenger.mapper;

import com.textmessenger.dto.receive.NotificationRxDto;
import com.textmessenger.dto.transfer.NotificationTxDto;
import com.textmessenger.model.entity.Notification;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface NotificationMapper {

  NotificationRxDto notToNotRxDto(Notification notification);

  List<NotificationRxDto> notsToNotRxDtos(List<Notification> notifications);

  NotificationTxDto notToNotTxDto(Notification notification);

  List<NotificationTxDto> notsToNotTxDtos(List<Notification> notifications);

  Notification notRxDtoToNot(NotificationRxDto notificationRxDto);

  List<Notification> notRxDtosToNots(List<NotificationRxDto> notificationRxDtos);

  Notification notTxDtoToNot(NotificationTxDto notificationTxDto);

  List<Notification> notTxDtosToNots(List<NotificationTxDto> notificationTxDtos);

}
