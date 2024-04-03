package com.user.registration.validator;

import com.user.registration.annotation.ValidPassword;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.regex.Matcher;
import java.util.regex.Pattern;


public class PasswordValidator implements ConstraintValidator<ValidPassword, String> {

  @Override
  public void initialize(ValidPassword constraintAnnotation) {
    ConstraintValidator.super.initialize(constraintAnnotation);
  }

  @Override
  public boolean isValid(String password, ConstraintValidatorContext constraintValidatorContext) {

    Pattern pattern = Pattern.compile(password);
    Matcher matcher = pattern.matcher(password);
    return matcher.matches();
//    if (password != null) {
//
//    }
//    return false;
  }
}
