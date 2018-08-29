package com.textmessenger.dto.view;

public class UserView {

  public interface UserBaseId {

  }

  public interface UserShort extends  UserBaseId {

  }

  public interface UserProfile extends UserShort {

  }

  public interface UserFull extends UserProfile {

  }

}
