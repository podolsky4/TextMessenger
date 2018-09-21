package com.textmessenger.service;

import com.textmessenger.model.entity.Comment;
import com.textmessenger.model.entity.Post;
import com.textmessenger.model.entity.User;
import com.textmessenger.model.entity.WebSocketType;
import com.textmessenger.model.entity.dto.CommentToFront;
import com.textmessenger.repository.CommentRepository;
import com.textmessenger.repository.UserRepository;
import com.textmessenger.security.UserPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class CommentServiceImpl implements CommentService {

  private final CommentRepository commentRepository;
  private final NotificationService notificationService;
  private final UserRepository userRepository;

  CommentServiceImpl(CommentRepository commentRepository,
                     NotificationService notificationService,
                     UserRepository userRepository) {
    this.commentRepository = commentRepository;
    this.notificationService = notificationService;

    this.userRepository = userRepository;
  }

  @Override
  public void createComment(Post post, User user, Comment comment) {
    comment.setPost(post);
    comment.setCommentator(user);
    commentRepository.save(comment);
    UserPrincipal userPrincipal = (UserPrincipal) SecurityContextHolder
            .getContext()
            .getAuthentication()
            .getPrincipal();
    User mainUser = userRepository.getOne(userPrincipal.getId());
    notificationService.createSome(WebSocketType.NEW_COMMENT.toString(), post.getUser(), mainUser, post);
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

}
