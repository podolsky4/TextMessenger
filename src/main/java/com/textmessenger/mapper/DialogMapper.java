package com.textmessenger.mapper;

import com.textmessenger.dto.receive.DialogRxDTO;
import com.textmessenger.dto.transfer.DialogTxDTO;
import com.textmessenger.model.entity.Dialog;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface DialogMapper {

  DialogRxDTO dialToDialRxDto(Dialog dialog);

  List<DialogRxDTO> dialsToDialRxDtos(List<Dialog> dialogs);

  DialogTxDTO dialToDialTxDto(Dialog dialog);

  List<DialogTxDTO> dialsToDialTxDtos(List<Dialog> dialogs);

  Dialog dialRxDtoToDial(DialogRxDTO dialogRxDto);

  List<Dialog> dialRxDtosToDials(List<DialogRxDTO> dialogRxDtos);

  Dialog dialTxDtoToDial(DialogTxDTO dialogTxDto);

  List<Dialog> dialTxDtosToDials(List<DialogTxDTO> dialogTxDtos);

}
