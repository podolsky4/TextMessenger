package com.textmessenger.mapper;

import com.textmessenger.dto.receive.DialogRxDto;
import com.textmessenger.dto.transfer.DialogTxDto;
import com.textmessenger.model.entity.Dialog;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface DialogMapper {

  DialogRxDto dialToDialRxDto(Dialog dialog);

  List<DialogRxDto> dialsToDialRxDtos(List<Dialog> dialogs);

  DialogTxDto dialToDialTxDto(Dialog dialog);

  List<DialogTxDto> dialsToDialTxDtos(List<Dialog> dialogs);

  Dialog dialRxDtoToDial(DialogRxDto dialogRxDto);

  List<Dialog> dialRxDtosToDials(List<DialogRxDto> dialogRxDtos);

  Dialog dialTxDtoToDial(DialogTxDto dialogTxDto);

  List<Dialog> dialTxDtosToDials(List<DialogTxDto> dialogTxDtos);

}
