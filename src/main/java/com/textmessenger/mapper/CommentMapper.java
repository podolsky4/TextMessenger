package com.textmessenger.mapper;

import com.textmessenger.dto.receive.CommentRxDTO;
import com.textmessenger.dto.transfer.CommentTxDTO;
import com.textmessenger.model.entity.Comment;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface CommentMapper {

  CommentMapper INSTANCE = Mappers.getMapper(CommentMapper.class);

  CommentRxDTO commToCommRxDto(Comment comment);

  CommentTxDTO commToCommTxDto(Comment comment);

  Comment commRxDtoToComm(CommentRxDTO commentRxDTO);

  Comment commRxDtoToComm(CommentTxDTO commentTxDTO);

}
