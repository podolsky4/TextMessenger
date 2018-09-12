package com.textmessenger.service;

import com.textmessenger.model.entity.Post;
import com.textmessenger.model.entity.User;
import com.textmessenger.model.entity.dto.PostToFront;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface PostService {

  void updatePost(Post post);

  void deletePost(Post post);

  List<PostToFront> getAll();

  List<PostToFront> getPage(int page, int size);

  List<Post> getUserPost(User user);

  void retwitPost(User user, Long postId);

  void createPost(String content, MultipartFile file) throws IOException;

  Post getPostById(long id);
}