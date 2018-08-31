package com.textmessenger.controller;

import com.textmessenger.dto.receive.CommentRxDto;
import com.textmessenger.dto.receive.PostRxDto;
import com.textmessenger.dto.receive.UserRxDto;
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

import javax.validation.Valid;
import java.util.Optional;


@RestController
@RequestMapping("/api/comments")
public class CommentController {

  private final CommentService commentService;

  CommentController(CommentService commentService) {
    this.commentService = commentService;
  }

  @PostMapping("/post/{id}/user/{userId}")
  ResponseEntity<?> createComment(@Valid @PathVariable("id") PostRxDto post,
                                  @Valid @PathVariable("userId") UserRxDto user,
                                  @Valid @RequestBody CommentRxDto comment) {
    commentService.createComment(post, user, comment);
    return ResponseEntity.ok().build();
  }

  @GetMapping("/post/{id}")
  ResponseEntity<?> getAllCommentsFromPost(@Valid @PathVariable("id") PostRxDto post) {
    return Optional.of(ResponseEntity.ok().body(commentService.findAllPostFromPost(post)))
            .orElse(ResponseEntity.noContent().build());
  }

  @PutMapping
  ResponseEntity<?> updateComment(@Valid @RequestBody CommentRxDto comment) {
    commentService.updateComment(comment);
    return ResponseEntity.ok().build();
  }

  @DeleteMapping
  ResponseEntity<?> deleteComment(@Valid @RequestBody CommentRxDto comment) {
    commentService.deleteComment(comment);
    return ResponseEntity.ok().build();
  }


}
