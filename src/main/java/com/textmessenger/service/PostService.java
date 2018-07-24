package com.textmessenger.service;

import com.textmessenger.model.Post;
import com.textmessenger.model.User;

import java.util.List;
import java.util.Optional;

public interface PostService {

  void createPost(User user, Post post);

  Post readPost(long id);

  void updatePost(Post oldPost, Post post);

  void deletePost(long id);

  Optional<Post> getById(long id);

  Optional<List<Post>> getAll();

  Optional<List<Post>> getPostToPage(int number, int limit);

  Optional<List<Post>> getUserPost(User user);

  void deleteAllPostsByUserId(User user);
}