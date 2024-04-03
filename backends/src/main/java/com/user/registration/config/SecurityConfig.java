package com.user.registration.config;

import com.user.registration.filters.JWTfilter;
import com.user.registration.repositories.UserRepository;
import com.user.registration.services.impl.UserDetailsImplement;
import jakarta.servlet.DispatcherType;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.HttpBasicDsl;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import java.lang.reflect.Array;
import java.util.Arrays;

import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;

@Configuration
@EnableWebSecurity
@EnableWebMvc
@RequiredArgsConstructor
public class SecurityConfig {

  @Value("${spring.profiles.active}")
  private String env;

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private AuthenticationProvider authenticationProvider;

  @Autowired
  private JWTfilter jwTfilter;

//  @Bean
//  public JWTfilter jwTfilter(){
//    return new JWTfilter();
//  }


  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http.csrf(AbstractHttpConfigurer::disable);
    http.sessionManagement(
      (session) ->
        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
    );
    http.authorizeRequests((auth) ->
        auth.dispatcherTypeMatchers(DispatcherType.FORWARD, DispatcherType.ERROR).permitAll()
          .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
          .requestMatchers("/api/v1/auth/**").permitAll()
          .requestMatchers("/img/**", "pdf/**", "js/**").permitAll()
          .requestMatchers("/api/v1/admin/**").hasAnyAuthority("ROLE_ADMIN")
          .requestMatchers("/api/v1/user/**").hasAnyAuthority("ROLE_USER")
          .anyRequest().authenticated()
      )
//      .cors(Customizer.withDefaults())
      .authenticationProvider(authenticationProvider)
      .addFilterBefore(jwTfilter, UsernamePasswordAuthenticationFilter.class);
    return http.build();
  }

  @Bean
  public FilterRegistrationBean corsFilter() {
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    CorsConfiguration config = new CorsConfiguration();
    config.setAllowCredentials(true);
    System.out.println(this.env);
    if (this.env.equals("dev")) {
      config.addAllowedOrigin("http://localhost:4200");
    } else {
      config.addAllowedOrigin("http://policy-application.s3-website-us-east-1.amazonaws.com");

    }

    config.setAllowedHeaders(Arrays.asList(
      HttpHeaders.AUTHORIZATION,
      HttpHeaders.CONTENT_TYPE,
      HttpHeaders.ACCEPT
    ));
    config.setAllowedMethods(Arrays.asList(
      HttpMethod.POST.name(),
      HttpMethod.GET.name(),
      HttpMethod.PUT.name(),
      HttpMethod.DELETE.name()

    ));
    config.setMaxAge(3600L);
    source.registerCorsConfiguration("/**", config);
    FilterRegistrationBean bean = new FilterRegistrationBean(new CorsFilter(source));
    bean.setOrder(-102);
    return bean;
  }

}
