package com.user.registration.services;

import com.user.registration.entities.Role;
import com.user.registration.entities.User;
import org.springframework.security.core.userdetails.UserDetailsService;


public interface UserService {

//  UserDetailsService userDetailsService();

  User saveUser(User user);

  Role saveRole(Role role);

  void addToUser(String username, String rolename);

}

