package com.textmessenger.repository;

import com.textmessenger.model.entity.Comment;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;


@RunWith(SpringRunner.class)
@DataJpaTest
public class CommentRepositoryTest {

  @Autowired
  private CommentRepository commentRepository;

  @Autowired
  private TestEntityManager entityManager;

  @Test
  public void findAllComment() {
    List<Comment> all = commentRepository.findAll();
    int allComment = all.size();
    assertThat(all).hasSize(allComment);
  }

  public Comment setComment() {
    Comment comment = new Comment();
    comment.setContent("content");
    return entityManager.persist(comment);
  }
}
