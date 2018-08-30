package com.textmessenger;

import com.textmessenger.model.entity.dto.SearchValue;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;
import org.springframework.beans.factory.annotation.Autowired;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(JUnit4.class)
public class SearchValueTest {

  @Autowired
  SearchValue searchValue;

  @Before
  public void setUp (){
    searchValue = new SearchValue();
  }

  @Test
  public void shoudBeTest(){
    String message = "test";
    searchValue.setSearch(message);
    assertThat(message.equals(searchValue.getSearch()));
  }
}
