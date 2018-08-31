package com.textmessenger.model.entity.dto;

import com.textmessenger.model.entity.User;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class UserToFrontShort {
  private long id;
  private String login;
  private String email;
  private String profilePhoto;

  public static UserToFrontShort convertUserForFront(User user) {
    UserToFrontShort userToFrontShort = new UserToFrontShort();
    userToFrontShort.setEmail(user.getEmail());
    userToFrontShort.setId(user.getId());
    userToFrontShort.setLogin(user.getLogin());
    if (user.getProfilePhoto() != null) {
      userToFrontShort.setProfilePhoto(user.getProfilePhoto());
    }
    return userToFrontShort;
  }

  public static List<UserToFrontShort> convertListUsersForFront(List<User> users) {
    List<UserToFrontShort> res = new ArrayList<>();
    users.stream().forEach(user -> res.add(convertUserForFront(user)));
    return res;
  }
}
