package com.textmessenger.service;

import com.textmessenger.constant.NotificationType;
import com.textmessenger.dto.receive.CommentRxDto;
import com.textmessenger.dto.receive.PostRxDto;
import com.textmessenger.dto.receive.UserRxDto;
import com.textmessenger.dto.transfer.CommentTxDto;
import com.textmessenger.mapper.CommentMapper;
import com.textmessenger.mapper.PostMapper;
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
  private final PostMapper postMapper;

  CommentServiceImpl(CommentRepository commentRepository, NotificationService notificationService,
                     CommentMapper commentMapper, PostMapper postMapper) {
    this.commentRepository = commentRepository;
    this.notificationService = notificationService;
    this.commentMapper = commentMapper;
    this.postMapper = postMapper;
  }

  @Override
  public void createComment(PostRxDto post, UserRxDto user, CommentRxDto comment) {
    comment.setPost(post);
    comment.setCommentator(user);
    commentRepository.save(commentMapper.commRxDtoToComm(comment));
    notificationService.createNotification(NotificationType.COMMENT.toString(), post.getUser(), post.getId());
  }

  @Override
  public List<CommentTxDto> findAllPostFromPost(PostRxDto post) {
    return commentMapper.commsToCommTxDtos(commentRepository.findCommentsByPost(postMapper.postRxDtoToPost(post)));
  }

  @Override
  public void updateComment(CommentRxDto comment) {
    commentRepository.save(commentMapper.commRxDtoToComm(comment));
  }

  @Override
  public void deleteComment(CommentRxDto comment) {
    commentRepository.delete(commentMapper.commRxDtoToComm(comment));
  }
}
