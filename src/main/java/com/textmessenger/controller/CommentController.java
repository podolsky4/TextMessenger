package com.textmessenger.controller;

import com.textmessenger.model.entity.Comment;
import com.textmessenger.model.entity.Post;
import com.textmessenger.model.entity.User;
import com.textmessenger.service.CommentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;


@RestController
@RequestMapping("/api/comments")
public class CommentController {

  private final CommentService commentService;

  CommentController(CommentService commentService) {
    this.commentService = commentService;
  }

  @PostMapping("/post/{id}/user/{userId}")
  ResponseEntity<?> createComment(@PathVariable("id") Post post,
                                  @PathVariable("userId") User user,
                                  @RequestBody Comment comment) {
    commentService.createComment(post, user, comment);
    return ResponseEntity.ok().build();
  }

  @GetMapping("/post/{id}")
  ResponseEntity<?> getAllCommentsFromPost(@PathVariable("id") Post post) {
    return Optional.of(ResponseEntity.ok().body(commentService.findAllPostFromPost(post)))
            .orElse(ResponseEntity.noContent().build());
  }

  @PutMapping
  ResponseEntity<?> updateComment(@RequestBody Comment comment) {
    commentService.updateComment(comment);
    return ResponseEntity.ok().build();
  }

  @DeleteMapping
  ResponseEntity<?> deleteComment(@RequestBody Comment comment) {
    commentService.deleteComment(comment);
    return ResponseEntity.ok().build();
  }


}
