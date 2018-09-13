package com.textmessenger;

import com.textmessenger.model.entity.dto.SearchValue;
import org.hibernate.validator.HibernateValidator;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;

import javax.validation.ConstraintViolation;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.assertEquals;

@RunWith(JUnit4.class)
public class SearchValueTest {

  @Autowired
  private SearchValue searchValue;
  private LocalValidatorFactoryBean localValidatorFactory;

  @Before

  public void setup() {
    localValidatorFactory = new LocalValidatorFactoryBean();
    localValidatorFactory.setProviderClass(HibernateValidator.class);
    localValidatorFactory.afterPropertiesSet();
  }


  @Test
  public void shouldBeTest() {
    String message = "test";
    searchValue = new SearchValue();
    searchValue.setSearch(message);
    assertThat(message.equals(searchValue.getSearch()));
  }

  @Test
  public void shouldBeMistake() {
    String message = " ";//передал пробел
    searchValue = new SearchValue();
    searchValue.setSearch(message);
    Set<ConstraintViolation<SearchValue>> constraintViolations = localValidatorFactory.validate(searchValue);
    System.out.println(constraintViolations.iterator().next().getMessage());
    assertEquals(
            1,
            constraintViolations.size()
    );
  }
}
