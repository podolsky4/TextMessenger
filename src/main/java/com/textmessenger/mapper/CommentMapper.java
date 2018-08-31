package com.textmessenger.mapper;

import com.textmessenger.dto.receive.CommentRxDto;
import com.textmessenger.dto.transfer.CommentTxDto;
import com.textmessenger.model.entity.Comment;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CommentMapper {

  CommentRxDto commToCommRxDto(Comment comment);

  List<CommentRxDto> commsToCommRxDtos(List<Comment> comments);

  CommentTxDto commToCommTxDto(Comment comment);

  List<CommentTxDto> commsToCommTxDtos(List<Comment> comments);

  Comment commRxDtoToComm(CommentRxDto commentRxDto);

  List<Comment> commRxDtosToComms(List<CommentRxDto> commentRxDtos);

  Comment commTxDtoToComm(CommentTxDto commentTxDto);

  List<Comment> commTxDtosToComms(List<CommentTxDto> commentTxDtos);

}
