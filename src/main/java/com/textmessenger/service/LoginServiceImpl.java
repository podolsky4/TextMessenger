package com.textmessenger.service;

import com.textmessenger.model.entity.User;
import com.textmessenger.model.entity.dto.LoginRq;
import com.textmessenger.model.entity.dto.Token;
import com.textmessenger.repository.UserRepository;
import com.textmessenger.security.JwtTokenProvider;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service

public class LoginServiceImpl implements LoginService {
  private UserRepository userRepository;
  private AuthenticationManager authenticationManager;
  private JwtTokenProvider jwtTokenProvider;
  private PasswordEncoder passwordEncoder;
  LoginServiceImpl(PasswordEncoder passwordEncoder,UserRepository userRepository, AuthenticationManager authenticationManager, JwtTokenProvider jwtTokenProvider){
    this.userRepository=userRepository;
    this.authenticationManager = authenticationManager;
    this.jwtTokenProvider = jwtTokenProvider;
    this.passwordEncoder = passwordEncoder;
  }
  @Override
  public ResponseEntity authenticateUser(LoginRq user) {
    Optional<User> byLoginOrEmail = userRepository.findByLoginOrEmail(user.getLoginOrEmail(), user.getLoginOrEmail());
    String str = passwordEncoder.encode(user.getPassword());
    System.out.println("==========================================================");
    System.out.println(str);
    System.out.println(byLoginOrEmail.get().getPassword());

    System.out.println("==========================================================");
    Authentication authenticate = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                    user.getLoginOrEmail(),
                    user.getPassword()
            )
    );

    SecurityContextHolder.getContext().setAuthentication(authenticate);
    String jwt = jwtTokenProvider.generateToken(authenticate);
    return ResponseEntity.ok(new Token(jwt));
  }
}
