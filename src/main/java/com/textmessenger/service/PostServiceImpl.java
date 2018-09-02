package com.textmessenger.service;

import com.textmessenger.model.entity.Post;
import com.textmessenger.model.entity.User;
import com.textmessenger.model.entity.dto.PostToFront;
import com.textmessenger.repository.PostRepository;
import com.textmessenger.repository.UserRepository;
import com.textmessenger.security.UserPrincipal;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@Transactional
public class PostServiceImpl implements PostService {

  private final PostRepository postRepository;
  private final UserRepository userRepository;

  PostServiceImpl(PostRepository postRepository, UserRepository userRepository) {
    this.postRepository = postRepository;
    this.userRepository = userRepository;
  }

  @Override
  public void createPost(String content, MultipartFile file) {
    // get user from token
    UserPrincipal userPrincipal = (UserPrincipal) SecurityContextHolder
            .getContext()
            .getAuthentication()
            .getPrincipal();
    // create post and set content & user
    Post post = new Post();
    post.setContent(content);
    post.setUser(userRepository.getOne(userPrincipal.getId()));
    //TODO add s3 logic
    // save new post in DB
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
  public List<PostToFront> getAll() {
    return PostToFront.convertListPostsToResponse(postRepository.findAll(orderBy()));
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