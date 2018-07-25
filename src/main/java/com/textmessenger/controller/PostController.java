package com.textmessenger.controller;

import com.textmessenger.model.Post;
import com.textmessenger.model.User;
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
@RequestMapping("/posts")
public class PostController {

  private final PostService postService;


  PostController(PostService postService) {
    this.postService = postService;
  }

  @GetMapping("/{id}")
  public ResponseEntity<?> getPost(@PathVariable long id) {
    return Optional.of(ResponseEntity.ok().body(postService.getById(id)))
            .orElse(ResponseEntity.noContent().build());
  }

  @GetMapping
  public ResponseEntity<?> getAll() {
    return Optional.of(ResponseEntity.ok().body(postService.getAll()))
            .orElse(ResponseEntity.noContent().build());
  }

  @PostMapping("/user/{id}")
  public ResponseEntity<?> createPost(@PathVariable("id") User user, @RequestBody Post post) {
    postService.createPost(user, post);
    return Optional.of(ResponseEntity.ok()).orElse(ResponseEntity.badRequest()).build();
  }

  @GetMapping("/page/{number}/{limit}")
  public ResponseEntity<?> getPostToPage(@PathVariable("number") int number,
                                         @PathVariable("limit") int limit) {
    return ResponseEntity.ok().body(postService.getPostToPage(number, limit));
  }

  @PutMapping
  public ResponseEntity<?> updatePost(@RequestBody Post post) {
    postService.updatePost(post);
    return Optional.of(ResponseEntity.ok()).orElse(ResponseEntity.unprocessableEntity()).build();
  }

  @GetMapping("/user/{id}")
  public ResponseEntity<?> getUserPost(@PathVariable("id") User user) {
    return Optional.of(ResponseEntity.ok().body(postService.getUserPost(user)))
            .orElse(ResponseEntity.noContent().build());
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<?> deletePostById(@PathVariable("id") Post post) {
    postService.deletePost(post.getId());
    return Optional.of(ResponseEntity.ok()).orElse(ResponseEntity.unprocessableEntity()).build();
  }

}