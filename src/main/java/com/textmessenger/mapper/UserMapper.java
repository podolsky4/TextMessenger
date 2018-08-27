package com.textmessenger.mapper;

import com.textmessenger.dto.receive.UserRxDTO;
import com.textmessenger.dto.transfer.UserTxDTO;
import com.textmessenger.model.entity.User;

import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {

  UserRxDTO userToRxDto(User user);

  UserTxDTO userToTxDto(User user);

  User userRxDtoToUser(UserRxDTO userRxDTO);

  User userTxDtoToUser(UserTxDTO userTxDTO);

}
