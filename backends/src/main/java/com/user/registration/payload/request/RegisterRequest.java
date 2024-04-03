package com.user.registration.payload.request;

import com.user.registration.annotation.ValidPassword;
import com.user.registration.annotation.ValidEmail;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {

  @NotEmpty
  private String user_name;
  @ValidEmail
  private String email;
  @ValidPassword
  private String password;
  @NotEmpty
  private String mobile_number;
}
