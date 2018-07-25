package com.textmessenger.service;

import com.textmessenger.model.Post;
import com.textmessenger.model.User;

import java.util.List;
import java.util.Optional;

public interface PostService {

  void createPost(User user, Post post);

  void updatePost(Post post);

  void deletePost(Post post);

  Optional<List<Post>> getAll();


  List<Post> getUserPost(User user);
}