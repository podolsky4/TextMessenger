package com.textmessenger.security;

import com.textmessenger.model.entity.User;
import com.textmessenger.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public abstract class SessionAware {
  @Autowired
  private UserRepository userRepository;

  protected final User getLoggedInUser() {
    UserPrincipal userPrincipal = (UserPrincipal) SecurityContextHolder
            .getContext()
            .getAuthentication()
            .getPrincipal();
    return userRepository.getOne(userPrincipal.getId());
  }
}