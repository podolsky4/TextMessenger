package com.textmessenger.security;

import com.textmessenger.model.entity.User;
import com.textmessenger.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomUserDetailsService implements UserDetailsService {
  private final UserRepository userRepository;

  public CustomUserDetailsService(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  @Override
  public UserDetails loadUserByUsername(String loginOrEmail) throws UsernameNotFoundException {
    Optional<User> user = userRepository.findByLoginOrEmail(loginOrEmail, loginOrEmail);
    if (user.isPresent()) {
      return UserPrincipal.create(user.get());
    }
    throw new UsernameNotFoundException("not found" + loginOrEmail);
  }

  public UserDetails loadUserById(Long id) throws UsernameNotFoundException {
    Optional<User> user = userRepository.findById(id);
    if (user.isPresent()) {
      return UserPrincipal.create(user.get());
    }
    throw new UsernameNotFoundException("not found" + id);
  }

}
