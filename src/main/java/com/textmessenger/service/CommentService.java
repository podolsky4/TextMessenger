package com.textmessenger.service;

import com.textmessenger.model.entity.Comment;
import com.textmessenger.model.entity.Post;
import com.textmessenger.model.entity.User;
import com.textmessenger.model.entity.dto.CommentToFront;

import java.util.List;

public interface CommentService {

  List<CommentToFront> findAllPostFromPost(Post post);

  void updateComment(Comment comment);

  void deleteComment(Comment comment);

  void createComment(Post post, User user, Comment comment);

  void deleteAllCommentsUnderPost(Post post);
}
