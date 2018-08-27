package com.textmessenger.mapper;

import com.textmessenger.dto.receive.MessageRxDTO;
import com.textmessenger.dto.transfer.MessageTxDTO;
import com.textmessenger.model.entity.Message;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MessageMapper {

  MessageRxDTO messToMessRxDto(Message message);

  MessageTxDTO messToMessTxDto(Message message);

  Message messRxDtoToMess(MessageRxDTO messageRxDTO);

  Message messTxDtoToMess(MessageTxDTO messageTxDTO);

}
