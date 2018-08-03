package com.textmessenger.service;

import com.textmessenger.model.entity.Comment;
import com.textmessenger.model.entity.Post;
import com.textmessenger.model.entity.User;

import java.util.List;

public interface CommentService {

  List<Comment> findAllPostFromPost(Post post);

  void updateComment(Comment comment);

  void deleteComment(Comment comment);

  void createComment(Post post, User user, Comment comment);
}
