package com.textmessenger.security;

import com.textmessenger.model.entity.User;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class UserPrincipal implements UserDetails {
  private Long id;
  private String login;
  private String email;
  private String password;
  private List<? extends GrantedAuthority> authorities;

  public UserPrincipal(Long id, String login, String email, String password,
                       List<? extends GrantedAuthority> authorities) {
    this.id = id;
    this.login = login;
    this.email = email;
    this.password = password;
    this.authorities = authorities;
  }

  @Override
  public String getUsername() {
    return login;
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return authorities;
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }

  public static UserPrincipal create(User user) {
    System.out.println(user.getPassword());
    return new UserPrincipal(
            user.getId(),
            user.getLogin(),
            user.getPassword(),
            user.getEmail(),
            user.getRoles().stream().map(s -> (GrantedAuthority) () -> s).collect(Collectors.toList())
    );
  }
}
