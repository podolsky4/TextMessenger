package com.textmessenger.service;

import com.textmessenger.model.Post;
import com.textmessenger.model.User;
import com.textmessenger.repository.PostRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class PostServiceImpl implements PostService {

  private final PostRepository postRepository;

  PostServiceImpl(PostRepository postRepository) {
    this.postRepository = postRepository;
  }

  @Override
  public void createPost(User user, Post post) {
    post.setUser(user);
    postRepository.save(post);
  }

  @Override
  public void updatePost(Post post) {
    postRepository.save(post);
  }

  @Override
  public void deletePost(Post post) {
    postRepository.delete(post);
  }

  @Override
  public Optional<List<Post>> getAll() {
    return Optional.of(postRepository.findAll());
  }

  @Override
  public List<Post> getUserPost(User user) {
    return postRepository.findPostsByUser(user);
  }

}