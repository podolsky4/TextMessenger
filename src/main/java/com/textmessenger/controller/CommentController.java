package com.textmessenger.controller;

import com.textmessenger.model.entity.Comment;
import com.textmessenger.model.entity.Post;
import com.textmessenger.model.entity.User;
import com.textmessenger.service.CommentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    ResponseEntity createComment(@Valid @PathVariable("id") Post post,
                                 @Valid @PathVariable("userId") User user,
                                 @Valid @RequestBody Comment comment) {
        commentService.createComment(post, user, comment);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/post/{id}")
    ResponseEntity getAllCommentsFromPost(@Valid @PathVariable("id") Post post) {
        return Optional.of(ResponseEntity.ok().body(commentService.findAllPostFromPost(post)))
                .orElse(ResponseEntity.noContent().build());
    }

    @PutMapping
    ResponseEntity updateComment(@RequestBody Comment comment) {
        commentService.updateComment(comment);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping
    ResponseEntity deleteComment(@RequestBody Comment comment) {
        commentService.deleteComment(comment);
        return ResponseEntity.ok().build();
    }


}
