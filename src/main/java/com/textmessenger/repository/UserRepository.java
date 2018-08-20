package com.textmessenger.repository;

import com.textmessenger.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

  User findUserByLogin(String login);

  User findUserByEmail(String email);

  List<User> findByEmailContainingIgnoreCaseOrLoginContainingIgnoreCase(String str, String str2);
}
