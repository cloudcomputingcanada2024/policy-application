package com.user.registration.repositories;

import com.user.registration.entities.Role;
import com.user.registration.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
  Optional<User> findByEmail(String email);
//  Optional<User> findByUsername(String username);

//  @Modifying
//  @Query(value = "SELECT Role.name\n" +
//    "FROM Role\n" +
//    "JOIN users_roles on users_roles.role_id\n" +
//    "WHERE users_roles.user_id =:id")
//  void finRoleByUserEmail(Long id);

//  boolean existsById(Long id);
}
