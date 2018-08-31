package com.textmessenger.model.entity.dto;

import com.textmessenger.model.entity.Post;
import com.textmessenger.model.entity.User;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
public class PostToFront {
  private long id;
  private String content;
  private Long parentId;
  private UserToFrontShort user;
  private List<UserToFrontShort> likers = new ArrayList<>();
  private LocalDateTime createdDate;
  private LocalDateTime updatedDate;

  public static PostToFront convertPostToFront (Post post){
    PostToFront responsePost = new PostToFront();
    responsePost.setId(post.getId());
    responsePost.setCreatedDate(post.getCreatedDate());
    if (post.getUpdatedDate()!=null){
      responsePost.setUpdatedDate(post.getUpdatedDate());
    }
    if (post.getContent()!=null){
      responsePost.setContent(post.getContent());
    }
    responsePost.setUser(UserToFrontShort.convertUserForFront(post.getUser()));
    if (post.getParentId()!=null){
      responsePost.setParentId(post.getParentId());
    }
    if (post.getLikers()!=null){
      responsePost.setLikers(UserToFrontShort.convertListUsersForFront(post.getLikers()));
    }
    return responsePost;
  }

  public static List<PostToFront> convertListPostsToResponse(List<Post> posts){
    List<PostToFront> res = new ArrayList<>();
    posts.stream().forEach(post ->res.add(convertPostToFront(post)));
    return res;
  }
}
