package com.textmessenger.service;

import com.textmessenger.constant.NotificationType;
import com.textmessenger.dto.receive.PostRxDTO;
import com.textmessenger.dto.receive.UserRxDTO;
import com.textmessenger.dto.transfer.PostTxDTO;
import com.textmessenger.mapper.NotificationMapper;
import com.textmessenger.mapper.PostMapper;
import com.textmessenger.mapper.UserMapper;
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
  public void createPost(UserRxDTO user, PostRxDTO post) {
    Post tempPost = postMapper.postRxDtoToPost(post);
    tempPost.setUser(userMapper.userRxDtoToUser(user));
    Post save = postRepository.save(tempPost);
    long tempSave = save.getId();
    User tempUser = userMapper.userRxDtoToUser(user);
    tempUser.getFollowers().forEach(u -> u.getNotifications()
            .add(notificationMapper
                    .notTxDtoToNot(notificationService
                            .createNotification(NotificationType.POST.toString(), u, tempSave))));
  }

  @Override
  public void updatePost(PostRxDTO post) {
    postRepository.save(postMapper.postRxDtoToPost(post));
  }

  @Override
  public void deletePost(PostRxDTO post) {
    postRepository.delete(postMapper.postRxDtoToPost(post));
  }

  @Override
  public Optional<List<PostTxDTO>> getAll() {

    return Optional.of(postMapper.postsToTxDtos(postRepository.findAll(orderBy())));
  }

  @Override
  public List<PostTxDTO> getUserPost(UserRxDTO user) {
    return postMapper.postsToTxDtos(postRepository.findPostsByUser(userMapper.userRxDtoToUser(user)));
  }

  private Sort orderBy() {
    return new Sort(Sort.Direction.DESC, "createdDate");
  }

  @Override
  public void retwitPost(UserRxDTO user, Long postId) {
    Post retwite = new Post();
    retwite.setUser(userMapper.userRxDtoToUser(user));
    retwite.setParentId(postId);
    postRepository.save(retwite);
  }
}