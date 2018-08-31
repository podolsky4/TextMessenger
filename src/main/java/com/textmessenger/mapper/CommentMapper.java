package com.textmessenger.mapper;

import com.textmessenger.dto.receive.CommentRxDTO;
import com.textmessenger.dto.transfer.CommentTxDTO;
import com.textmessenger.model.entity.Comment;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CommentMapper {

  CommentRxDTO commToCommRxDto(Comment comment);

  List<CommentRxDTO> commsToCommRxDtos(List<Comment> comments);

  CommentTxDTO commToCommTxDto(Comment comment);

  List<CommentTxDTO> commsToCommTxDtos(List<Comment> comments);

  Comment commRxDtoToComm(CommentRxDTO commentRxDTO);

  List<Comment> commRxDtosToComms(List<CommentRxDTO> commentRxDTOS);

  Comment commTxDtoToComm(CommentTxDTO commentTxDTO);

  List<Comment> commTxDtosToComms(List<CommentTxDTO> commentTxDTOS);

}
