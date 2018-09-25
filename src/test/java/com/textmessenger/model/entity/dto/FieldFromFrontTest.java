package com.textmessenger.model.entity.dto;

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
public class FieldFromFrontTest {

  private FieldFromFront fieldFromFront;

  private LocalValidatorFactoryBean localValidatorFactoryBean;

  @Before
  public void setup() {
    localValidatorFactoryBean = new LocalValidatorFactoryBean();
    localValidatorFactoryBean.setProviderClass(HibernateValidator.class);
    localValidatorFactoryBean.afterPropertiesSet();
  }

  @Test
  public void shouldBeTest() {
    fieldFromFront = new FieldFromFront();
    String oldPassword = "asdfghjkl";
    String newPassword = "zxcvbnm";
    fieldFromFront.setOldPassword(oldPassword);
    fieldFromFront.setNewPassword(newPassword);
    assertThat(oldPassword.equals(fieldFromFront.getOldPassword()));
    assertThat(newPassword.equals(fieldFromFront.getNewPassword()));
  }

  @Test
  public void FieldFromFrontNotValid() {
    fieldFromFront = new FieldFromFront();
    fieldFromFront.setOldPassword(" ");
    fieldFromFront.setNewPassword(" ");
    Set<ConstraintViolation<FieldFromFront>> constraintViolations = localValidatorFactoryBean.validate(fieldFromFront);
    assertEquals(2, constraintViolations.size());
  }

  @Test
  public void FieldFromFrontNotValidOldPassword() {
    fieldFromFront = new FieldFromFront();
    fieldFromFront.setOldPassword(" ");
    fieldFromFront.setNewPassword("zxcvbnm");
    Set<ConstraintViolation<FieldFromFront>> constraintViolations = localValidatorFactoryBean.validate(fieldFromFront);
    assertEquals(1, constraintViolations.size());
  }

  @Test
  public void FieldFromFrontNotValidNewPassword() {
    fieldFromFront = new FieldFromFront();
    fieldFromFront.setOldPassword("asdfghjkl");
    fieldFromFront.setNewPassword(" ");
    Set<ConstraintViolation<FieldFromFront>> constraintViolations = localValidatorFactoryBean.validate(fieldFromFront);
    assertEquals(1, constraintViolations.size());
  }
}
