package com.textmessenger.mapper;

import com.textmessenger.dto.receive.CommentRxDTO;
import com.textmessenger.dto.transfer.CommentTxDTO;
import com.textmessenger.model.entity.Comment;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CommentMapper {

  CommentRxDTO commToCommRxDto(Comment comment);

  CommentTxDTO commToCommTxDto(Comment comment);

  Comment commRxDtoToComm(CommentRxDTO commentRxDTO);

  Comment commRxDtoToComm(CommentTxDTO commentTxDTO);

}
