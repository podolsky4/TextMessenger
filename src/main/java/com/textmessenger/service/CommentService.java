package com.textmessenger.service;

import com.textmessenger.model.entity.Comment;
import com.textmessenger.model.entity.Post;

import java.util.List;

public interface CommentService {

  void createComment(Post post, Comment comment);

  List<Comment> findAllPostFromPost(Post post);

  void updateComment(Comment comment);

  void deleteComment(Comment comment);

}
