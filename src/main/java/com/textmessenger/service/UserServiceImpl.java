package com.textmessenger.service;

import com.textmessenger.model.User;
import com.textmessenger.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class UserServiceImpl implements UserService {

  private final UserRepository userRepository;

  public UserServiceImpl(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  @Override
  public long createUser(User user) {
    return userRepository.save(user).getId();
  }

  @Override
  public User readUser(long id) {
    return userRepository.getOne(id);
  }

  @Override
  public void updateUser(long id, User user) {
    User existing = userRepository.getOne(id);

    user.setId(existing.getId());

    userRepository.save(user);
  }

  @Override
  public void deleteUser(long id) {
    userRepository.delete(userRepository.getOne(id));
  }
}
