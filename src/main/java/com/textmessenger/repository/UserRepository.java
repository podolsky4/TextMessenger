package com.textmessenger.repository;

import com.textmessenger.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
  User findUserByLogin(String login);

  User findUserByEmail(String email);
}
