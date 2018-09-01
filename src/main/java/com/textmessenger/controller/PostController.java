package com.textmessenger.controller;

import com.textmessenger.model.entity.Post;
import com.textmessenger.model.entity.User;
import com.textmessenger.service.PostService;
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
@RequestMapping("/api/posts")

public class PostController {

  private final PostService postService;


  PostController(PostService postService) {
    this.postService = postService;
  }

  @GetMapping
  public ResponseEntity getAllPosts() {
    return ResponseEntity.ok().body(postService.getAll());
  }

  @PostMapping("/user/{id}")
  public ResponseEntity createPost(@PathVariable("id") User user, @RequestBody Post post) {
    postService.createPost(user, post);
    return Optional.of(ResponseEntity.ok()).orElse(ResponseEntity.badRequest()).build();
  }

  @PutMapping
  public ResponseEntity updatePost(@RequestBody Post post) {
    postService.updatePost(post);
    return Optional.of(ResponseEntity.ok()).orElse(ResponseEntity.unprocessableEntity()).build();
  }

  @GetMapping("/user/{id}")
  public ResponseEntity getUserPost(@PathVariable("id") User user) {
    return Optional.of(ResponseEntity.ok().body(postService.getUserPost(user)))
            .orElse(ResponseEntity.noContent().build());
  }

  @DeleteMapping("/{id}")
  public ResponseEntity deletePostById(@PathVariable("id") Post post) {
    postService.deletePost(post);
    return ResponseEntity.status(200).build();
  }

  @PostMapping("/user/{id}/post/{postId}")
  public ResponseEntity retwitePost(@PathVariable("id") User user, @PathVariable("postId") Long postId) {
    postService.retwitPost(user, postId);
    return Optional.of(ResponseEntity.ok()).orElse(ResponseEntity.badRequest()).build();
  }
}