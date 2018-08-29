package com.textmessenger.service;

import com.textmessenger.dto.receive.CommentRxDTO;
import com.textmessenger.dto.receive.PostRxDTO;
import com.textmessenger.dto.receive.UserRxDTO;
import com.textmessenger.dto.transfer.CommentTxDTO;
import com.textmessenger.model.entity.Comment;
import com.textmessenger.model.entity.Post;
import com.textmessenger.model.entity.User;

import java.util.List;

public interface CommentService {

  List<CommentTxDTO> findAllPostFromPost(PostRxDTO post);

  void updateComment(CommentRxDTO comment);

  void deleteComment(CommentRxDTO comment);

  void createComment(PostRxDTO post, UserRxDTO user, CommentRxDTO comment);
}
