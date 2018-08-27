package com.textmessenger.mapper;

import com.textmessenger.dto.receive.DialogRxDTO;
import com.textmessenger.dto.transfer.DialogTxDTO;
import com.textmessenger.model.entity.Dialog;
import org.mapstruct.Mapper;

@Mapper
public interface DialogMapper {

  DialogRxDTO dialToDialRxDto(Dialog dialog);

  DialogTxDTO dialToDialTxDto(Dialog dialog);

  Dialog dialRxDtoToDial(DialogRxDTO dialogRxDTO);

  Dialog dialRxDtoToDial(DialogTxDTO dialogTxDTO);

}
