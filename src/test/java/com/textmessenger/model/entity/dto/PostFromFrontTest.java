package com.textmessenger.model.entity.dto;

import org.hibernate.validator.HibernateValidator;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;

import static org.assertj.core.api.Assertions.assertThat;


@RunWith(JUnit4.class)
public class PostFromFrontTest {

  private PostFromFront postFromFront;

  private LocalValidatorFactoryBean localValidatorFactoryBean;

  @Before
  public void setup() {
    localValidatorFactoryBean = new LocalValidatorFactoryBean();
    localValidatorFactoryBean.setProviderClass(HibernateValidator.class);
    localValidatorFactoryBean.afterPropertiesSet();
  }

  @Test
  public void shouldBeTest() {
    postFromFront = new PostFromFront();
    String content = "content";
    postFromFront.setContent(content);
    assertThat(content.equals(postFromFront.getContent()));
  }

}
