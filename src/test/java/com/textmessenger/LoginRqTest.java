package com.textmessenger;
import com.textmessenger.model.entity.dto.LoginRq;
import org.hibernate.validator.HibernateValidator;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;

import javax.validation.ConstraintViolation;

import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.assertEquals;

@RunWith(JUnit4.class)
public class LoginRqTest {
  private LoginRq loginRq;
  private LocalValidatorFactoryBean localValidatorFactory;

  @Before
  public void setup() {
    localValidatorFactory = new LocalValidatorFactoryBean();
    localValidatorFactory.setProviderClass(HibernateValidator.class);
    localValidatorFactory.afterPropertiesSet();
  }

  @Test
  public void shouldBeTest(){
    String loginOrEmail = "testLoginOrEmail";
    String password = "testttttttt";
    loginRq = new LoginRq(loginOrEmail,password);
    assertThat(loginOrEmail.equals(loginRq.getLoginOrEmail()));
    assertThat(password.equals(loginRq.getPassword()));
  }

  @Test
  public void loginRqIsValid() {
    loginRq = new LoginRq( "Morris", "DD-AB-123");
    Set<ConstraintViolation<LoginRq>> constraintViolations = localValidatorFactory.validate(loginRq);
    assertEquals( 0, constraintViolations.size() );
  }

  @Test
  public void loginRqNotValid() {
    loginRq = new LoginRq( " ", " ");
    Set<ConstraintViolation<LoginRq>> constraintViolations = localValidatorFactory.validate(loginRq);
    assertEquals( 2, constraintViolations.size() );
  }
  @Test
  public void loginRqNotValidLogin() {
    loginRq = new LoginRq( " ", "fdfd");
    Set<ConstraintViolation<LoginRq>> constraintViolations = localValidatorFactory.validate(loginRq);
    assertEquals( 1, constraintViolations.size() );
  }

  @Test
  public void loginRqNotValidPassword() {
    loginRq = new LoginRq( "fdfdf", " ");
    Set<ConstraintViolation<LoginRq>> constraintViolations = localValidatorFactory.validate(loginRq);
    assertEquals( 1, constraintViolations.size() );
  }
}
