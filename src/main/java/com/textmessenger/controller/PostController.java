package com.textmessenger.controller;

import com.textmessenger.model.entity.Post;
import com.textmessenger.model.entity.User;
import com.textmessenger.model.entity.dto.PostToFront;
import com.textmessenger.service.PostService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@RestController
@RequestMapping("/api/posts")

public class PostController {

  private final PostService postService;


  PostController(PostService postService) {
    this.postService = postService;
  }

  @GetMapping("/{id}")
  public ResponseEntity getPostById(@PathVariable("id") long id) {
    return ResponseEntity.ok().body(PostToFront.convertPostToFront(postService.getPostById(id)));
  }

  @GetMapping("/{page}/{size}")
  public ResponseEntity getPagePost(@PathVariable("page") int page, @PathVariable("size") int size) {
    return ResponseEntity.ok().body(postService.getPage(page, size));
  }

  @GetMapping
  public ResponseEntity getAllPosts() {
    return ResponseEntity.ok().body(postService.getAll());
  }

  @PostMapping
  public ResponseEntity createPost(@RequestParam("content") String content,
                                   @RequestParam(value = "file", required = false) MultipartFile file) throws IOException {
    postService.createPost(content, file);
    return Optional.of(ResponseEntity.ok()).orElse(ResponseEntity.badRequest()).build();
  }

  @PutMapping
  public ResponseEntity updatePost(@RequestBody Post post) {
    postService.updatePost(post);
    return Optional.of(ResponseEntity.ok()).orElse(ResponseEntity.unprocessableEntity()).build();
  }

  @DeleteMapping("/{id}")
  public ResponseEntity deletePostById(@PathVariable("id") Post post) {
    postService.deletePost(post);
    return ResponseEntity.status(200).build();
  }

  @PostMapping("/user/{id}/post/{postId}")
  public ResponseEntity retweetPost(@PathVariable("id") User user, @PathVariable("postId") Long postId) {
    postService.retwitPost(user, postId);
    return Optional.of(ResponseEntity.ok()).orElse(ResponseEntity.badRequest()).build();
  }
}