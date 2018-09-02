package com.textmessenger.service;

import com.textmessenger.model.entity.Post;
import com.textmessenger.model.entity.User;
import com.textmessenger.model.entity.dto.PostToFront;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface PostService {

  void updatePost(Post post);

  void deletePost(Post post);

  List<PostToFront> getAll();

  List<Post> getUserPost(User user);

  void retwitPost(User user, Long postId);

  void createPost(String content, MultipartFile file);
}