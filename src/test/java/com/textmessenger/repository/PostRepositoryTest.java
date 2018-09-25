package com.textmessenger.repository;

import com.textmessenger.model.entity.Post;
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
public class PostRepositoryTest {

  @Autowired
  private PostRepository postRepository;

  @Autowired
  private TestEntityManager entityManager;

  @Test
  public void findAllPosts() {
    List<Post> all = postRepository.findAll();
    int allPosts = all.size();
    assertThat(all).hasSize(allPosts);
  }

  public Post setPost() {
    Post post = new Post();
    post.setContent("post");
    post.setImgKey("qweqrtyjskj");
    post.setImgUrl("/img/"+post.getImgKey());
    return entityManager.persist(post);
  }
}
