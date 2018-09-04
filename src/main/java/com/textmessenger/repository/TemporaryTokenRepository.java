package com.textmessenger.repository;

import com.textmessenger.model.entity.TemporaryToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TemporaryTokenRepository extends JpaRepository<TemporaryToken, Long> {
  public Optional<TemporaryToken> findByToken(String token);
}
