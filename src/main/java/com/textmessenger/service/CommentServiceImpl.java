package com.textmessenger.service;

import com.textmessenger.model.entity.Comment;
import com.textmessenger.model.entity.Post;
import com.textmessenger.model.entity.User;
import com.textmessenger.model.entity.WebSocketType;
import com.textmessenger.model.entity.dto.CommentToFront;
import com.textmessenger.repository.CommentRepository;
import com.textmessenger.security.SessionAware;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class CommentServiceImpl extends SessionAware implements CommentService {

  private final CommentRepository commentRepository;
  private final NotificationService notificationService;


  CommentServiceImpl(CommentRepository commentRepository,
                     NotificationService notificationService) {
    this.commentRepository = commentRepository;
    this.notificationService = notificationService;
  }

  @Override
  public void createComment(Post post, User user, Comment comment) {
    comment.setPost(post);
    comment.setCommentator(user);
    commentRepository.save(comment);
    User mainUser = getLoggedInUser();
    notificationService.createSome(WebSocketType.NEW_COMMENT.toString(), post.getUser(), mainUser, post);
  }

  @Override
  public List<CommentToFront> findAllPostFromPost(Post post) {
    return CommentToFront.convertListCommentsToResponse(commentRepository.findCommentsByPost(post));
  }

}
