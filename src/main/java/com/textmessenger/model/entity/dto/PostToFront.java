package com.textmessenger.model.entity.dto;

import com.textmessenger.model.entity.Post;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
public class PostToFront {
  private long id;//NOSONAR
  private String content;//NOSONAR
  private PostToFront parent;//NOSONAR
  private UserToFrontShort user;//NOSONAR
  private String imgUrl; //NOSONAR
  private List<UserToFrontShort> likers = new ArrayList<>();//NOSONAR
  private List<CommentToFront> comments = new ArrayList<>();//NOSONAR
  private LocalDateTime createdDate;//NOSONAR
  private LocalDateTime updatedDate;//NOSONAR

  public static PostToFront convertPostToFront(Post post) {
    PostToFront responsePost = new PostToFront();
    responsePost.setId(post.getId());
    responsePost.setCreatedDate(post.getCreatedDate());
    if (post.getUpdatedDate() != null) {
      responsePost.setUpdatedDate(post.getUpdatedDate());
    }
    if (post.getContent() != null) {
      responsePost.setContent(post.getContent());
    }
    responsePost.setUser(UserToFrontShort.convertUserForFront(post.getUser()));
    if (post.getParent() != null) {
      responsePost.setParent(convertPostToFront(post.getParent()));
    }
    if (post.getLikers() != null) {
      responsePost.setLikers(UserToFrontShort.convertListUsersForFront(post.getLikers()));
    }
    if (post.getImgUrl() != null) {
      responsePost.setImgUrl(post.getImgUrl());
    }
    if (post.getComments() != null) {
      responsePost.setComments(CommentToFront.convertListCommentsToResponse(post.getComments()));
    }
    return responsePost;
  }

  public static List<PostToFront> convertListPostsToResponse(List<Post> posts) {
    List<PostToFront> res = new ArrayList<>();
    posts.stream().forEach(post -> res.add(convertPostToFront(post)));
    return res;
  }
}
