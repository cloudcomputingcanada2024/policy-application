package com.user.registration.payload.base;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.user.registration.error.ValidationError;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

//
@Builder
@Getter
@Setter

public class ErrorResponse {

  private HttpStatus status;
  private Integer statusCode;
  private String reason;
  private String message;

  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "MM-dd-yyyy hh:mm:ss", timezone = "Asia/Islamabad")
  private Date timestamp;
  private Map<String, List<ValidationError>> validationErrors = new HashMap<>();

}