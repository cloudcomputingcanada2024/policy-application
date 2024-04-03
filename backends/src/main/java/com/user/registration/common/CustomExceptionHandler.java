package com.user.registration.common;

import com.user.registration.error.ValidationError;
import com.user.registration.payload.base.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.*;

@RestControllerAdvice
public class CustomExceptionHandler {
  private ResponseEntity<ErrorResponse> buildErrorResponse(
    HttpStatus status,
    String message,
    Map<String, List<ValidationError>> validationErrors
  ) {
    ErrorResponse errorResponse = ErrorResponse.builder()
      .status(status)
      .statusCode(status.value())
      .message(message)
      .validationErrors(validationErrors)
      .timestamp(new Date())
      .build();
    return new ResponseEntity<>(errorResponse, status);


  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<ErrorResponse> handleValidationError(MethodArgumentNotValidException e) {

    Map<String, List<ValidationError>> validationErrors = new HashMap<>();
    ResponseEntity<ErrorResponse> errorResponseResponseEntity = buildErrorResponse(HttpStatus.BAD_REQUEST, "Validation Error", validationErrors);

    List<FieldError> fieldErrors = e.getBindingResult().getFieldErrors();

    for (FieldError fieldError : fieldErrors) {
      List<ValidationError> validationErrorsList = Objects.requireNonNull(errorResponseResponseEntity.getBody())
        .getValidationErrors().get(fieldError.getField());
      if (validationErrorsList == null) {
        validationErrorsList = new ArrayList<>();
        errorResponseResponseEntity.getBody().getValidationErrors().put(fieldError.getField(), validationErrorsList);
      }
      ValidationError validationError = ValidationError.builder()
        .code(fieldError.getCode())
        .message(fieldError.getDefaultMessage())
        .build();
      validationErrorsList.add(validationError);
    }
    return errorResponseResponseEntity;
  }
}
