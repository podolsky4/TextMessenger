package com.textmessenger.repository;

import com.textmessenger.model.entity.TemporaryToken;
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
public class TemporaryTokenRepositoryTest {

  @Autowired
  private TemporaryTokenRepository temporaryTokenRepository;

  @Autowired
  private TestEntityManager entityManager;

  @Test
  public void findAllTempTokens() {
    List<TemporaryToken> all = temporaryTokenRepository.findAll();
    int allTempToken = all.size();
    assertThat(all).hasSize(allTempToken);
  }

  public TemporaryToken setTempToken() {
    TemporaryToken temporaryToken = new TemporaryToken();
    temporaryToken.setToken("kdjf123i5jd6567iu7$10s$ieurijs");
    return entityManager.persist(temporaryToken);
  }
}
