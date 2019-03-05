package com.textmessenger.repository;

import com.textmessenger.model.entity.Comment;
import com.textmessenger.model.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

  List<Comment> findCommentsByPost(Post post);

  void deleteAllByPostId(long id);

}
