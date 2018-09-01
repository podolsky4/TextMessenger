package com.textmessenger.service;

import com.textmessenger.model.entity.Post;
import com.textmessenger.model.entity.User;
import com.textmessenger.model.entity.dto.PostToFront;

import java.util.List;

public interface PostService {

  void createPost(UserRxDto user, PostRxDto post);

  void updatePost(PostRxDto post);

  void deletePost(PostRxDto post);
  
  List<PostToFront> getAll();

  List<PostTxDto> getUserPost(UserRxDto user);

  void retwitPost(UserRxDto user, Long postId);
}