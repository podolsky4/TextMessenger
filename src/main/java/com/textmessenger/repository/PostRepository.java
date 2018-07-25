package com.textmessenger.repository;


import com.textmessenger.model.Post;
import com.textmessenger.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
  List<Post> findPostsByUser(User user);
}
