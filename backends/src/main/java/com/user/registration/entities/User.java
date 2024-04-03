package com.user.registration.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.*;
import java.util.stream.Collectors;

@Setter
@Getter
@NoArgsConstructor
@Data
@Entity
@Table(name = "users")
public class User implements UserDetails{
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String user_name;
  private String email;
  private String password;
  private String mobile_number;
  private Date created_at;
  private Date updated_at;


  @PrePersist
  protected void createAt() {
    this.created_at = new Date(System.currentTimeMillis());
  }

  @PreUpdate
  protected void updatedAt() {
    this.updated_at = new Date(System.currentTimeMillis());
  }


  @ManyToMany(fetch = FetchType.EAGER)
  @JoinTable(
    name = "users_roles",
    joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
    inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id")
  )
  @JsonIgnore
  Set<Role> roles = new HashSet<>();


  public User(String user_name, String email, String password, String mobile_number, Set<Role> roles) {

    this.user_name = user_name;
    this.email = email;
    this.password = password;
    this.mobile_number = mobile_number;
    this.roles = roles;
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    List<GrantedAuthority> authorities = this.roles.stream()
      .map(role -> new SimpleGrantedAuthority(role.getName()))
      .collect(Collectors.toList());
    return authorities;
  }

  @Override
  public String getUsername() {
    return this.email;
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }
}
