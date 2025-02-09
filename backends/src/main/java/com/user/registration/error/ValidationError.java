package com.user.registration.error;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class ValidationError {
  private String code;
  private String message;
}
