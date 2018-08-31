package com.textmessenger.mapper;

import com.textmessenger.dto.receive.MessageRxDTO;
import com.textmessenger.dto.transfer.MessageTxDTO;
import com.textmessenger.model.entity.Message;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface MessageMapper {

  MessageRxDTO messToMessRxDto(Message message);

  List<MessageRxDTO> messsToMessRxDtos(List<Message> messages);

  MessageTxDTO messToMessTxDto(Message message);

  List<MessageTxDTO> messsToMessTxDtos(List<Message> messages);

  Message messRxDtoToMess(MessageRxDTO messageRxDto);

  List<Message> messRxDtosToMesss(List<MessageRxDTO> messageRxDtos);

  Message messTxDtoToMess(MessageTxDTO messageTxDto);

  List<Message> messTxDtosToMesss(List<MessageTxDTO> messageTxDtos);

}
