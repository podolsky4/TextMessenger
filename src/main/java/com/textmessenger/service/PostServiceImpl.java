package com.textmessenger.service;

import com.textmessenger.model.entity.Post;
import com.textmessenger.model.entity.User;
import com.textmessenger.repository.PostRepository;
import org.springframework.data.domain.Sort;
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

    return Optional.of(postRepository.findAll(orderBy()));
  }

  @Override
  public List<Post> getUserPost(User user) {
    return postRepository.findPostsByUser(user);
  }

  private Sort orderBy() {
    return new Sort(Sort.Direction.DESC, "createdDate");
  }

  @Override
  public void retwitPost(User user, Long postId) {
    Post retwite = new Post();
    retwite.setUser(user);
    retwite.setParentId(postId);
    postRepository.save(retwite);
  }
}