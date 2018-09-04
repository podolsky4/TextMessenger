package com.textmessenger.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.textmessenger.config.AmazonConfig;
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

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional
public class PostServiceImpl implements PostService {
  private static final String BUCKET = AmazonConfig.BUCKET_NAME;//NOSONAR
  private AmazonConfig s3;
  private final PostRepository postRepository;
  private final UserRepository userRepository;

  PostServiceImpl(PostRepository postRepository, UserRepository userRepository, AmazonConfig s3) {
    this.postRepository = postRepository;
    this.userRepository = userRepository;
    this.s3 = s3;
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
    post.setUser(userRepository.getOne(userPrincipal.getId()));
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
  public List<PostToFront> getPage(int page, int size) {
    List<Post> all = postRepository.findAll(orderBy());
    return PostToFront.convertListPostsToResponse(all.stream()
            .skip(page * size)
            .limit(size)
            .collect(Collectors.toList()));
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