package com.user.registration.annotation;

import com.user.registration.validator.EmailValidator;
import com.user.registration.validator.PasswordValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.TYPE,ElementType.FIELD,ElementType.ANNOTATION_TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = PasswordValidator.class)
public @interface ValidPassword {
  String message() default "Invalid password";
  Class<?>[] groups() default {};

  Class<? extends Payload>[] payload() default {};
}



