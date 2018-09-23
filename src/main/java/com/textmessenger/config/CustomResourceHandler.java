package com.textmessenger.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.ResourceResolver;

@Configuration
@EnableWebMvc
@ComponentScan
public class CustomResourceHandler implements WebMvcConfigurer {

  @Override
  public void addResourceHandlers(ResourceHandlerRegistry registry) {
    ResourceResolver resolver = new ReactResourceResolver();
    registry.addResourceHandler("/**")
            .resourceChain(true)
            .addResolver(resolver);

  }
}