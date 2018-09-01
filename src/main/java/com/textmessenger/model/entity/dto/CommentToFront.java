package com.textmessenger.model.entity.dto;

import com.textmessenger.model.entity.Comment;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
public class CommentToFront {
  private long id;
  private String content;
  private long user;
  private long post;
  private LocalDateTime createdDate;

  public static CommentToFront convertCommentToFront(Comment comment) {
    CommentToFront commentToFront = new CommentToFront();
    commentToFront.setId(comment.getId());
    commentToFront.setContent(comment.getContent());
    commentToFront.setUser(comment.getCommentator().getId());
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
