package com.textmessenger.service;

import com.textmessenger.model.Post;
import com.textmessenger.model.User;
import com.textmessenger.repository.PostRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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
  public Post readPost(long id) {
    return postRepository.getOne(id);
  }

  @Override
  public void updatePost(Post post) {
    postRepository.save(post);
  }

  @Override
  public void deletePost(long id) {
    postRepository.deleteById(id);
  }

  @Override
  public Optional<Post> getById(long id) {
    return postRepository.findById(id);
  }

  @Override
  public Optional<List<Post>> getAll() {
    return Optional.of(postRepository.findAll());
  }

  @Override
  public Optional<List<Post>> getPostToPage(int number, int limit) {
    return Optional.of(postRepository.findAll().stream().skip(number * limit)
            .limit(limit).collect(Collectors.toList()));
  }

  @Override
  public List<Post> getUserPost(User user) {
    return postRepository.findPostsByUser(user);
  }

}