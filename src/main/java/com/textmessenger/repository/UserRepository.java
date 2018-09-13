package com.textmessenger.repository;

import com.textmessenger.model.entity.Dialog;
import com.textmessenger.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

  User findUserByLogin(String login);

  User findUserByEmail(String email);

  List<User> findByEmailContainingIgnoreCaseOrLoginContainingIgnoreCase(String str, String str2);

  Optional<User> findByLoginOrEmail(String login, String email);

  List<User> findUsersByDialogs(Dialog dialog);
}
