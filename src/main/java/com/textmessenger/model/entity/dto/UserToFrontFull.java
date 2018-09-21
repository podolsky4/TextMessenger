package com.textmessenger.model.entity.dto;

import com.textmessenger.model.entity.User;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class UserToFrontFull {
  private long id;//NOSONAR
  private String login;//NOSONAR
  private String email;//NOSONAR
  private String firstName;//NOSONAR
  private String lastName;//NOSONAR
  private String address;//NOSONAR
  private String profilePhoto;//NOSONAR


  public static UserToFrontFull convertUserForFront(User user) {
    UserToFrontFull userToFrontShort = new UserToFrontFull();
    userToFrontShort.setEmail(user.getEmail());
    userToFrontShort.setId(user.getId());
    userToFrontShort.setLogin(user.getLogin());
    if (user.getProfilePhoto() != null) {
      userToFrontShort.setProfilePhoto(user.getProfilePhoto());
    }
    if (user.getAddress() != null) {
      userToFrontShort.setAddress(user.getAddress());
    }
    if (user.getFirstName() != null) {
      userToFrontShort.setFirstName(user.getFirstName());
    }
    if (user.getLastName() != null) {
      userToFrontShort.setLastName(user.getLastName());
    }
    return userToFrontShort;
  }

  public static List<UserToFrontFull> convertListUsersForFront(List<User> users) {
    List<UserToFrontFull> res = new ArrayList<>();
    users.stream().forEach(user -> res.add(convertUserForFront(user)));
    return res;
  }
}
