package com.textmessenger.repository;


import com.textmessenger.model.entity.Post;
import com.textmessenger.model.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

  List<Post> findPostsByUser(User user);

  Page<Post> findAllByOrderByCreatedDateDesc(Pageable pageable);

  void deletePostsByParentId(long parentId);

  List<Post> findAllByParent(Post parentId);
}
