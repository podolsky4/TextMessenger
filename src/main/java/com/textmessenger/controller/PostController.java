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

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/posts")
public class PostController {

  private final PostService postService;


  PostController(PostService postService) {
    this.postService = postService;
  }

  @GetMapping("/{id}")
  public Optional<Post> getPost(@PathVariable long id) {
    return postService.getById(id);
  }

  @GetMapping
  public ResponseEntity<Optional<List<Post>>> getAll() {
    return ResponseEntity.ok().body(postService.getAll());
  }

  @PostMapping("/{id}")
  public void createPost(@PathVariable("id") User user, @RequestBody Post post) {
    postService.createPost(user, post);
  }

  @GetMapping("/page/{number}/{limit}")
  public ResponseEntity<Optional<List<Post>>> getPostToPage(@PathVariable("number") int number,
                                                            @PathVariable("limit") int limit) {
    return ResponseEntity.ok().body(postService.getPostToPage(number, limit));
  }

  @PutMapping("/{id}")
  public void updatePost(@PathVariable("id") Post oldPost, @RequestBody Post post) {
    postService.updatePost(oldPost, post);
  }

  @GetMapping("/user/{id}")
  public ResponseEntity<Optional<List<Post>>> getUserPost(@PathVariable("id") User user) {
    return ResponseEntity.ok().body(postService.getUserPost(user));
  }

  @DeleteMapping("/{id}")
  public void deletePostById(@PathVariable("id") Post post) {
    postService.deletePost(post.getId());
  }

  @DeleteMapping("/user/{id}")
  public void deleteAllPostsByUserId(@PathVariable("id") User user) {
    postService.deleteAllPostsByUserId(user);
  }
}