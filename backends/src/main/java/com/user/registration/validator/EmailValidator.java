package com.user.registration.validator;

import com.user.registration.annotation.ValidEmail;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.regex.Matcher;
import java.util.regex.Pattern;



public class EmailValidator implements ConstraintValidator<ValidEmail, String> {

  @Override
  public void initialize(ValidEmail constraintAnnotation) {
    ConstraintValidator.super.initialize(constraintAnnotation);
  }

  @Override
  public boolean isValid(String email, ConstraintValidatorContext constraintValidatorContext) {

    Pattern pattern = Pattern.compile(email);
    Matcher matcher = pattern.matcher(email);
    return  matcher.matches() && (4<=email.length() && email.length() <= 64);

  }
}
