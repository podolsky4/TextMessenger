package com.textmessenger.mapper;

import com.textmessenger.dto.receive.MessageRxDto;
import com.textmessenger.dto.transfer.MessageTxDto;
import com.textmessenger.model.entity.Message;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface MessageMapper {

  MessageRxDto messToMessRxDto(Message message);

  List<MessageRxDto> messsToMessRxDtos(List<Message> messages);

  MessageTxDto messToMessTxDto(Message message);

  List<MessageTxDto> messsToMessTxDtos(List<Message> messages);

  Message messRxDtoToMess(MessageRxDto messageRxDto);

  List<Message> messRxDtosToMesss(List<MessageRxDto> messageRxDtos);

  Message messTxDtoToMess(MessageTxDto messageTxDto);

  List<Message> messTxDtosToMesss(List<MessageTxDto> messageTxDtos);

}
