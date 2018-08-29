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

  User userRxDtoToUser(UserRxDTO userRxDTO);

  User userTxDtoToUser(UserTxDTO userTxDTO);

  List<User> userRxDtosToUsers(List<UserRxDTO> userRxDTOS);

  List<User> userTxDtosToUsers(List<UserTxDTO> userTxDTOS);

  List<UserRxDTO> usersToRxDtos(List<User> users);

  List<UserTxDTO> usersToTxDtos(List<User> users);

}
