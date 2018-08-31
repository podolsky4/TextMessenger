package com.textmessenger.service;

import com.textmessenger.dto.receive.CommentRxDto;
import com.textmessenger.dto.receive.PostRxDto;
import com.textmessenger.dto.receive.UserRxDto;
import com.textmessenger.dto.transfer.CommentTxDto;

import java.util.List;

public interface CommentService {

  List<CommentTxDto> findAllPostFromPost(PostRxDto post);

  void updateComment(CommentRxDto comment);

  void deleteComment(CommentRxDto comment);

  void createComment(PostRxDto post, UserRxDto user, CommentRxDto comment);
}
