package com.textmessenger.model.entity.dto;

import com.textmessenger.model.entity.Comment;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
public class CommentToFront {
  private long id;//NOSONAR
  private String content;//NOSONAR
  private UserToFrontShort user;//NOSONAR
  private long post;//NOSONAR
  private LocalDateTime createdDate;//NOSONAR

  public static CommentToFront convertCommentToFront(Comment comment) {
    CommentToFront commentToFront = new CommentToFront();
    commentToFront.setId(comment.getId());
    commentToFront.setContent(comment.getContent());
    commentToFront.setUser(UserToFrontShort.convertUserForFront(comment.getCommentator()));
    commentToFront.setPost(comment.getPost().getId());
    commentToFront.setCreatedDate(comment.getCreatedDate());
    return commentToFront;
  }

  public static List<CommentToFront> convertListCommentsToResponse(List<Comment> comments) {
    List<CommentToFront> res = new ArrayList<>();
    comments.stream().forEach(comment -> res.add(convertCommentToFront(comment)));
    return res;
  }
}
