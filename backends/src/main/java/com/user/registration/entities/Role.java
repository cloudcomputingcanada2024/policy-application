package com.user.registration.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "roles")
public class Role {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String name;
  private String description;
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


  @ManyToMany(mappedBy = "roles")
  @JsonIgnore
  Set<User> users = new HashSet<>();

  public Role(Long id, String name, String description) {
    this.id = id;
    this.name = name;
    this.description = description;

  }

  public Role(String name) {
    this.name = name;
  }

}
