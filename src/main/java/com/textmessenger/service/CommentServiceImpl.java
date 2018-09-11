package com.textmessenger.service;

import com.textmessenger.constant.NotificationType;
import com.textmessenger.constant.WebSocketType;
import com.textmessenger.model.entity.Comment;
import com.textmessenger.model.entity.Post;
import com.textmessenger.model.entity.User;
import com.textmessenger.model.entity.dto.CommentToFront;
import com.textmessenger.model.entity.dto.WebSocketMessage;
import com.textmessenger.repository.CommentRepository;
import com.textmessenger.repository.UserRepository;
import com.textmessenger.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class CommentServiceImpl implements CommentService {

  private final CommentRepository commentRepository;
  private final NotificationService notificationService;
  private SimpMessagingTemplate simpMessagingTemplate;
  private final UserRepository userRepository;
  @Value("${ws.path}")
  private String path;

  CommentServiceImpl(CommentRepository commentRepository,
                     NotificationService notificationService,
                     SimpMessagingTemplate simpMessagingTemplate,
                     UserRepository userRepository) {
    this.commentRepository = commentRepository;
    this.notificationService = notificationService;
    this.simpMessagingTemplate = simpMessagingTemplate;
    this.userRepository = userRepository;
  }

  @Override
  public void createComment(Post post, User user, Comment comment) {
    UserPrincipal userPrincipal = (UserPrincipal) SecurityContextHolder
            .getContext()
            .getAuthentication()
            .getPrincipal();
    User mainUser = userRepository.getOne(userPrincipal.getId());
    comment.setPost(post);
    comment.setCommentator(user);
    Comment save = commentRepository.save(comment);
    notificationService.createNotification(NotificationType.COMMENT.toString(), post.getUser(),mainUser, post.getId());
    simpMessagingTemplate.convertAndSendToUser(post.getUser().getLogin(), path, setField(user.getLogin(),
            post.getUser().getLogin(), save, WebSocketType.NEW_COMMENT.toString()));
  }

  @Override
  public List<CommentToFront> findAllPostFromPost(Post post) {
    return CommentToFront.convertListCommentsToResponse(commentRepository.findCommentsByPost(post));
  }

  @Override
  public void updateComment(Comment comment) {
    commentRepository.save(comment);
  }

  @Override
  public void deleteComment(Comment comment) {
    commentRepository.delete(comment);
  }

  public static WebSocketMessage setField(String senderLogin, String receiverLogin, Comment comment, String type) {
    WebSocketMessage testingWs = new WebSocketMessage();
    testingWs.setType(type);
    testingWs.setSender(senderLogin);
    testingWs.setReceiver(receiverLogin);
    testingWs.setCommentToFront(CommentToFront.convertCommentToFront(comment));
    return testingWs;
  }
}
