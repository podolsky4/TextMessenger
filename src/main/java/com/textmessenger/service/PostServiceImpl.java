package com.textmessenger.service;

import com.textmessenger.constant.NotificationType;
import com.textmessenger.model.entity.Post;
import com.textmessenger.model.entity.User;
import com.textmessenger.model.entity.dto.PostToFront;
import com.textmessenger.repository.PostRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class PostServiceImpl implements PostService {

  private final PostRepository postRepository;
  private final NotificationService notificationService;

  PostServiceImpl(PostRepository postRepository, NotificationService notificationService) {
    this.postRepository = postRepository;
    this.notificationService = notificationService;
  }

  @Override
  public void createPost(User user, Post post) {
    post.setUser(user);
    Post save = postRepository.save(post);
    user.getFollowers().forEach(u -> u.getNotifications()
            .add(notificationService.createNotification(NotificationType.POST.toString(), u, save.getId())));
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