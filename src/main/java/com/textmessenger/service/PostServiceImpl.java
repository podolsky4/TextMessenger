package com.textmessenger.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.textmessenger.config.AmazonConfig;
import com.textmessenger.constant.NotificationType;
import com.textmessenger.constant.WebSocketType;
import com.textmessenger.model.entity.Post;
import com.textmessenger.model.entity.User;
import com.textmessenger.model.entity.dto.PostToFront;
import com.textmessenger.model.entity.dto.WebSocketMessage;
import com.textmessenger.repository.PostRepository;
import com.textmessenger.repository.UserRepository;
import com.textmessenger.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
public class PostServiceImpl implements PostService {
  private static final String BUCKET = AmazonConfig.BUCKET_NAME;//NOSONAR
  private AmazonConfig s3;
  private final PostRepository postRepository;
  private final UserRepository userRepository;
  private SimpMessagingTemplate simpMessagingTemplate;
  private final NotificationService notificationService;
  @Value("${ws.path}")
  private String path;


  PostServiceImpl(PostRepository postRepository,
                  UserRepository userRepository,
                  AmazonConfig s3,
                  SimpMessagingTemplate simpMessagingTemplate,
                  NotificationService notificationService) {
    this.postRepository = postRepository;
    this.userRepository = userRepository;
    this.s3 = s3;
    this.simpMessagingTemplate = simpMessagingTemplate;
    this.notificationService = notificationService;
  }

  @Override
  public void createPost(String content, MultipartFile file) throws IOException {
    // get user from token
    UserPrincipal userPrincipal = (UserPrincipal) SecurityContextHolder
            .getContext()
            .getAuthentication()
            .getPrincipal();
    // create post and set content & user
    Post post = new Post();
    post.setContent(content);
    User one = userRepository.getOne(userPrincipal.getId());
    post.setUser(one);
    // Amazon logic
    if (file != null) {
      String typeFile = file.getContentType();
      String type = "." + typeFile.substring(6);
      String key = "postImage/" + UUID.randomUUID() + type;
      InputStream fileFromFront = file.getInputStream();
      AmazonS3 amazonS3 = s3.getConnection();
      amazonS3.putObject(
              BUCKET,
              key,
              fileFromFront,
              new ObjectMetadata());
      String urlToPost = amazonS3.getUrl(BUCKET, key).toString();
      post.setImgUrl(urlToPost);
      post.setImgKey(key);
    }
    // save new post in DB
    Post save = postRepository.save(post);
    one.getFollowers().forEach(user -> {
      notificationService.createSome(WebSocketType.NEW_POST.toString(), user, one, save);
              //notificationService.createNotification( WebSocketType.NEW_POST.toString(), user, one, save.getId());
             // simpMessagingTemplate.convertAndSendToUser(user.getLogin(), path,setField(one.getLogin(),user.getLogin(), save, WebSocketType.NEW_POST.toString()));
            }
    );

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
  public List<PostToFront> getPage(int page, int size) {
    Page<Post> posts = postRepository.findAllByOrderByCreatedDateDesc(PageRequest.of(page, size));
    return PostToFront.convertListPostsToResponse(posts.getContent());
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
    Post retweet = new Post();
    Post original = postRepository.getOne(postId);
    String login = original.getUser().getLogin();
    retweet.setUser(user);
    retweet.setParent(original);
    Post save = postRepository.save(retweet);
    simpMessagingTemplate.convertAndSendToUser(login, path,
            setField(user.getLogin(), login, save, WebSocketType.NEW_RETWEET.toString()));
  }

  @Override
  public Post getPostById(long id) {
    return postRepository.getOne(id);
  }

  public static WebSocketMessage setField(String senderLogin, String receiverLogin, Post post, String type) {
    WebSocketMessage testingWs = new WebSocketMessage();
    testingWs.setType(type);
    testingWs.setSender(senderLogin);
    testingWs.setReceiver(receiverLogin);
    testingWs.setPostToFront(PostToFront.convertPostToFront(post));
    return testingWs;
  }
}