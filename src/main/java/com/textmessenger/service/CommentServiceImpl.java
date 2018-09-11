package com.textmessenger.service;

import com.textmessenger.constant.NotificationType;
import com.textmessenger.constant.WebSocketType;
import com.textmessenger.model.entity.Comment;
import com.textmessenger.model.entity.Post;
import com.textmessenger.model.entity.User;
import com.textmessenger.model.entity.dto.CommentToFront;
import com.textmessenger.model.entity.dto.WebSocketMessage;
import com.textmessenger.repository.CommentRepository;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.textmessenger.constant.Constants.WS_PATH;

@Service
@Transactional
public class CommentServiceImpl implements CommentService {

  private final CommentRepository commentRepository;
  private final NotificationService notificationService;
  private SimpMessagingTemplate simpMessagingTemplate;

  CommentServiceImpl(CommentRepository commentRepository,
                     NotificationService notificationService,
                     SimpMessagingTemplate simpMessagingTemplate) {
    this.commentRepository = commentRepository;
    this.notificationService = notificationService;
    this.simpMessagingTemplate = simpMessagingTemplate;
  }

  @Override
  public void createComment(Post post, User user, Comment comment) {
    comment.setPost(post);
    comment.setCommentator(user);
    Comment save = commentRepository.save(comment);
    notificationService.createNotification(NotificationType.COMMENT.toString(), post.getUser(), post.getId());
    simpMessagingTemplate.convertAndSendToUser(post.getUser().getLogin(), WS_PATH, setField(user.getLogin(),
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
