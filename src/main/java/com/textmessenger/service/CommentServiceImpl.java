package com.textmessenger.service;

import com.textmessenger.constant.NotificationType;
import com.textmessenger.dto.transfer.CommentTxDTO;
import com.textmessenger.mapper.CommentMapper;
import com.textmessenger.model.entity.Comment;
import com.textmessenger.model.entity.Post;
import com.textmessenger.model.entity.User;
import com.textmessenger.repository.CommentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class CommentServiceImpl implements CommentService {

  private final CommentRepository commentRepository;
  private final NotificationService notificationService;
  private final CommentMapper commentMapper;

  CommentServiceImpl(CommentRepository commentRepository, NotificationService notificationService,
                     CommentMapper commentMapper) {
    this.commentRepository = commentRepository;
    this.notificationService = notificationService;
    this.commentMapper = commentMapper;
  }

  @Override
  public void createComment(Post post, User user, Comment comment) {
    comment.setPost(post);
    comment.setCommentator(user);
    commentRepository.save(comment);
    notificationService.createNotification(NotificationType.COMMENT.toString(), post.getUser(), post.getId());
  }

  @Override
  public List<CommentTxDTO> findAllPostFromPost(Post post) {
    return commentMapper.commsToCommTxDtos(commentRepository.findCommentsByPost(post));
  }

  @Override
  public void updateComment(Comment comment) {
    commentRepository.save(comment);
  }

  @Override
  public void deleteComment(Comment comment) {
    commentRepository.delete(comment);
  }
}
