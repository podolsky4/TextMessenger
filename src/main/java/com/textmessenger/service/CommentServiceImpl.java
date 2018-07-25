package com.textmessenger.service;

import com.textmessenger.model.Comment;
import com.textmessenger.model.Post;
import com.textmessenger.repository.CommentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class CommentServiceImpl implements CommentService {
  private final CommentRepository commentRepository;

  CommentServiceImpl(CommentRepository commentRepository) {
    this.commentRepository = commentRepository;
  }

  @Override
  public void createComment(Post post, Comment comment) {
    comment.setPost(post);
    commentRepository.save(comment);
  }

  @Override
  public List<Comment> findAllPostFromPost(Post post) {
    return commentRepository.findCommentsByPost(post);
  }

  @Override
  public void updateComment(Comment comment) {
    commentRepository.save(comment);
  }

}
