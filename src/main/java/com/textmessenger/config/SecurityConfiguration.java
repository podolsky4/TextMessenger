package com.textmessenger.config;

import com.textmessenger.security.CustomUserDetailsService;
import com.textmessenger.security.JwtAuthenticationEntryPoint;
import com.textmessenger.security.JwtAuthenticationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
  private CustomUserDetailsService customUserDetailsService;
  private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
  private JwtAuthenticationFilter jwtAuthenticationFilter;

  public SecurityConfiguration(CustomUserDetailsService customUserDetailsService,
                               JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint,
                               JwtAuthenticationFilter jwtAuthenticationFilter) {
    this.customUserDetailsService = customUserDetailsService;
    this.jwtAuthenticationEntryPoint = jwtAuthenticationEntryPoint;
    this.jwtAuthenticationFilter = jwtAuthenticationFilter;
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Override
  protected void configure(AuthenticationManagerBuilder auth) throws Exception {
    auth.userDetailsService(customUserDetailsService).passwordEncoder(passwordEncoder());
  }

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http
            .headers()
            .frameOptions()
            .disable()
            .and()
            .csrf()
            .disable()
            .exceptionHandling()
            .authenticationEntryPoint(jwtAuthenticationEntryPoint)
            .and()
            .sessionManagement()
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
            .authorizeRequests()
            .antMatchers("/api/users/login", "/console", "/static/**", "/*",
                    "/api/users/user", "/api/users/registered/**", "/api/users/resetPassword/**",
                    "/api/users/forgotpassword", "/api/users/changePassword", "/console/*")
            .permitAll()
            .anyRequest()
            .authenticated();
    http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
  }

  @Bean(BeanIds.AUTHENTICATION_MANAGER)
  @Override
  public AuthenticationManager authenticationManagerBean() throws Exception {
    return super.authenticationManagerBean();
  }

}
