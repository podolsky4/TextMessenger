package com.textmessenger.service;

import com.textmessenger.model.Comment;
import com.textmessenger.model.Post;

import java.util.List;

public interface CommentService {
  void createComment(Post post, Comment comment);

  List<Comment> findAllPostFromPost(Post post);

  void updateComment(Comment comment);

  void deleteComment(Comment comment);

}
