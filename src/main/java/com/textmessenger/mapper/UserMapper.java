package com.textmessenger.mapper;

import com.textmessenger.dto.receive.UserRxDTO;
import com.textmessenger.dto.transfer.UserTxDTO;
import com.textmessenger.model.entity.User;

import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserMapper {

  UserRxDTO userToRxDto(User user);

  UserTxDTO userToTxDto(User user);

  User userRxDtoToUser(UserRxDTO userRxDto);

  User userTxDtoToUser(UserTxDTO userTxDto);

  List<User> userRxDtosToUsers(List<UserRxDTO> userRxDtos);

  List<User> userTxDtosToUsers(List<UserTxDTO> userTxDtos);

  List<UserRxDTO> usersToRxDtos(List<User> users);

  List<UserTxDTO> usersToTxDtos(List<User> users);

}
