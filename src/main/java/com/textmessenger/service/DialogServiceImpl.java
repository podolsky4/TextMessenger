package com.textmessenger.service;

import com.textmessenger.constant.NotificationType;
import com.textmessenger.dto.receive.DialogRxDto;
import com.textmessenger.dto.receive.UserRxDto;
import com.textmessenger.dto.transfer.DialogTxDto;
import com.textmessenger.mapper.DialogMapper;
import com.textmessenger.mapper.UserMapper;
import com.textmessenger.model.entity.Dialog;
import com.textmessenger.model.entity.User;
import com.textmessenger.repository.DialogRepository;
import com.textmessenger.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class DialogServiceImpl implements DialogService {

  private final DialogRepository dialogRepository;
  private final UserRepository userRepository;
  private final NotificationService notificationService;
  private final DialogMapper dialogMapper;
  private final UserMapper userMapper;

  public DialogServiceImpl(DialogRepository dialogRepository, UserRepository userRepository,
                           NotificationService notificationService, DialogMapper dialogMapper,
                           UserMapper userMapper) {
    this.dialogRepository = dialogRepository;
    this.userRepository = userRepository;
    this.notificationService = notificationService;
    this.dialogMapper = dialogMapper;
    this.userMapper = userMapper;
  }

  @Override
  public void createDialog(DialogRxDto dialog) {
    dialogRepository.save(dialogMapper.dialRxDtoToDial(dialog));
  }

  public List<DialogTxDto> getDialogsByUser(UserRxDto user) {
    return dialogMapper.dialsToDialTxDtos(
            dialogRepository.findDialogsByUsers(userMapper.userRxDtoToUser(user)));
  }

  @Override
  public void updateDialog(DialogRxDto dialog) {
    dialogRepository.save(dialogMapper.dialRxDtoToDial(dialog));
  }

  @Override
  public void deleteDialog(long id) {
    dialogRepository.delete(dialogRepository.getOne(id));
  }

  @Override
  public void createdByUserDialogWithUser(String login, Long user) {
    User firstUser = userRepository.findUserByLogin(login);
    User secondUser = userRepository.getOne(user);
    Dialog dialog = new Dialog();
    Dialog save = dialogRepository.save(dialog);
    firstUser.getDialogs().add(save);
    secondUser.getDialogs().add(save);
    notificationService.createNotification(
            NotificationType.DIALOG.toString(), userMapper.userToRxDto(firstUser), save.getId());
  }

  @Override
  public void addToDialogNewUser(Long dialog, Long user) {
    User one = userRepository.getOne(user);
    Dialog save = dialogRepository.getOne(dialog);
    one.getDialogs().add(save);
    notificationService.createNotification(
            NotificationType.DIALOG.toString(), userMapper.userToRxDto(one), save.getId());
  }
}
