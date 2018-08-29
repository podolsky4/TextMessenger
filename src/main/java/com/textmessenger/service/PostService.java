package com.textmessenger.service;

import com.textmessenger.dto.receive.PostRxDTO;
import com.textmessenger.dto.receive.UserRxDTO;
import com.textmessenger.dto.transfer.PostTxDTO;
import com.textmessenger.model.entity.Post;
import com.textmessenger.model.entity.User;

import java.util.List;
import java.util.Optional;

public interface PostService {

  void createPost(UserRxDTO user, PostRxDTO post);

  void updatePost(PostRxDTO post);

  void deletePost(PostRxDTO post);

  Optional<List<PostTxDTO>> getAll();

  List<PostTxDTO> getUserPost(UserRxDTO user);

  void retwitPost(UserRxDTO user, Long postId);
}