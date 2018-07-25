package com.textmessenger.repository;


import com.textmessenger.model.Post;
import com.textmessenger.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
  void deleteAllByUser(User user);

  Optional<List<Post>> findAllPostsByUser(User user);


  void createPostWithUser(User user, Post post);

  void updateOldPostWithNewPost(Post oldPost, Post newPost);
}
