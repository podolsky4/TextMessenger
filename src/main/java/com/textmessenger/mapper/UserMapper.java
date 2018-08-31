package com.textmessenger.mapper;

import com.textmessenger.dto.receive.UserRxDto;
import com.textmessenger.dto.transfer.UserTxDto;
import com.textmessenger.model.entity.User;

import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserMapper {

  UserRxDto userToRxDto(User user);

  UserTxDto userToTxDto(User user);

  User userRxDtoToUser(UserRxDto userRxDto);

  User userTxDtoToUser(UserTxDto userTxDto);

  List<User> userRxDtosToUsers(List<UserRxDto> userRxDtos);

  List<User> userTxDtosToUsers(List<UserTxDto> userTxDtos);

  List<UserRxDto> usersToRxDtos(List<User> users);

  List<UserTxDto> usersToTxDtos(List<User> users);

}
