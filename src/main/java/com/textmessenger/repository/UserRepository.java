package com.textmessenger.repository;

import com.textmessenger.config.AsyncConfiguration;
import com.textmessenger.model.entity.Dialog;
import com.textmessenger.model.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

  User findUserByLogin(String login);

  User findUserByEmail(String email);

  List<User> findByEmailContainingIgnoreCaseOrLoginContainingIgnoreCase(String str, String str2);

  Optional<User> findByLoginOrEmail(String login, String email);

  List<User> findUsersByDialogs(Dialog dialog);

  @Async(AsyncConfiguration.TASK_EXECUTOR_REPOSITORY)
  CompletableFuture<Page<User>> findAllBy(final Pageable pageable);

  @Async(AsyncConfiguration.TASK_EXECUTOR_REPOSITORY)
  CompletableFuture<User> findOneById(final long id);
}
