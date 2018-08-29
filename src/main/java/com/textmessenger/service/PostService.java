package com.textmessenger.service;

import com.textmessenger.dto.transfer.PostTxDTO;
import com.textmessenger.model.entity.Post;
import com.textmessenger.model.entity.User;

import java.util.List;
import java.util.Optional;

public interface PostService {

  void createPost(User user, Post post);

  void updatePost(Post post);

  void deletePost(Post post);

  Optional<List<PostTxDTO>> getAll();

  List<PostTxDTO> getUserPost(User user);

  void retwitPost(User user, Long postId);
}