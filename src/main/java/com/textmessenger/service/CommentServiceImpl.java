package com.textmessenger.service;

import com.textmessenger.constant.NotificationType;
import com.textmessenger.dto.receive.CommentRxDTO;
import com.textmessenger.dto.receive.PostRxDTO;
import com.textmessenger.dto.receive.UserRxDTO;
import com.textmessenger.dto.transfer.CommentTxDTO;
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
  public void createComment(PostRxDTO post, UserRxDTO user, CommentRxDTO comment) {
    comment.setPost(post);
    comment.setCommentator(user);
    commentRepository.save(commentMapper.commRxDtoToComm(comment));
    notificationService.createNotification(NotificationType.COMMENT.toString(), post.getUser(), post.getId());
  }

  @Override
  public List<CommentTxDTO> findAllPostFromPost(PostRxDTO post) {
    return commentMapper.commsToCommTxDtos(commentRepository.findCommentsByPost(postMapper.postRxDtoToPost(post)));
  }

  @Override
  public void updateComment(CommentRxDTO comment) {
    commentRepository.save(commentMapper.commRxDtoToComm(comment));
  }

  @Override
  public void deleteComment(CommentRxDTO comment) {
    commentRepository.delete(commentMapper.commRxDtoToComm(comment));
  }
}
