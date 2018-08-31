package com.textmessenger.service;

import com.textmessenger.dto.receive.PostRxDto;
import com.textmessenger.dto.receive.UserRxDto;
import com.textmessenger.dto.transfer.PostTxDto;

import java.util.List;
import java.util.Optional;

public interface PostService {

  void createPost(UserRxDto user, PostRxDto post);

  void updatePost(PostRxDto post);

  void deletePost(PostRxDto post);

  Optional<List<PostTxDto>> getAll();

  List<PostTxDto> getUserPost(UserRxDto user);

  void retwitPost(UserRxDto user, Long postId);
}