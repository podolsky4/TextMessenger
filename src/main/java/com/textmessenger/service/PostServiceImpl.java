package com.textmessenger.service;

import com.textmessenger.constant.NotificationType;
import com.textmessenger.dto.receive.PostRxDto;
import com.textmessenger.dto.receive.UserRxDto;
import com.textmessenger.dto.transfer.PostTxDto;
import com.textmessenger.mapper.NotificationMapper;
import com.textmessenger.mapper.PostMapper;
import com.textmessenger.mapper.UserMapper;
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
  private final PostMapper postMapper;
  private final UserMapper userMapper;
  private final NotificationMapper notificationMapper;

  PostServiceImpl(PostRepository postRepository, NotificationService notificationService, PostMapper postMapper,
                  UserMapper userMapper, NotificationMapper notificationMapper) {
    this.postRepository = postRepository;
    this.notificationService = notificationService;
    this.postMapper = postMapper;
    this.userMapper = userMapper;
    this.notificationMapper = notificationMapper;
  }

  @Override
  public void createPost(UserRxDto user, PostRxDto post) {
    Post tempPost = postMapper.postRxDtoToPost(post);
    tempPost.setUser(userMapper.userRxDtoToUser(user));
    Post save = postRepository.save(tempPost);
    long tempSave = save.getId();
    User tempUser = userMapper.userRxDtoToUser(user);
    tempUser.getFollowers().forEach(u -> u.getNotifications()
            .add(notificationMapper
                    .notTxDtoToNot(notificationService
                            .createNotification(NotificationType.POST.toString(), user, tempSave))));
  }

  @Override
  public void updatePost(PostRxDto post) {
    postRepository.save(postMapper.postRxDtoToPost(post));
  }

  @Override
  public void deletePost(PostRxDto post) {
    postRepository.delete(postMapper.postRxDtoToPost(post));
  }

  @Override
  public List<PostToFront> getAll() {
    return PostToFront.convertListPostsToResponse(postRepository.findAll(orderBy()));
  }

  @Override
  public List<PostTxDto> getUserPost(UserRxDto user) {
    return postMapper.postsToTxDtos(postRepository.findPostsByUser(userMapper.userRxDtoToUser(user)));
  }

  private Sort orderBy() {
    return new Sort(Sort.Direction.DESC, "createdDate");
  }

  @Override
  public void retwitPost(UserRxDto user, Long postId) {
    Post retwite = new Post();
    retwite.setUser(userMapper.userRxDtoToUser(user));
    retwite.setParentId(postId);
    postRepository.save(retwite);
  }
}