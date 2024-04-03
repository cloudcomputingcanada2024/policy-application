package com.user.registration.filters;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.user.registration.entities.Role;
import com.user.registration.entities.User;
import com.user.registration.repositories.RoleRepository;
import com.user.registration.repositories.UserRepository;
import com.user.registration.repositories.customRepository.CustomRoleRepository;
import com.user.registration.services.JWTtokenService;
import com.user.registration.services.UserService;
import com.user.registration.services.impl.UserDetailsServiceImpl;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import com.user.registration.exception.ErrorResponse;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.*;

import static java.util.Arrays.*;
import static org.springframework.util.MimeTypeUtils.APPLICATION_JSON_VALUE;

@Component
@RequiredArgsConstructor
public class JWTfilter extends OncePerRequestFilter {
  @Autowired
  public UserRepository userRepository;

  @Autowired
  public RoleRepository roleRepository;
  @Autowired
  private JWTtokenService jwTtokenService;

  @Autowired
  private UserDetailsServiceImpl userDetailsService;
  @Autowired
  private CustomRoleRepository customRoleRepository;

  private static final Logger logger = LoggerFactory.getLogger(JWTfilter.class);

//  @Override
//  protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull FilterChain filterChain) throws ServletException, IOException {
//
//    final String authHeader = request.getHeader("Authorization");
//    String jwtToken = null;
//    String userEmail = null;
//
//    if (authHeader != null && authHeader.startsWith("Bearer ")) {
//      try {
//        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
//        jwtToken = authHeader.substring(7);
//        userEmail = jwTtokenService.extractUserName(jwtToken);
//        User user = userRepository.findByEmail(userEmail).orElseThrow(() -> new NoSuchElementException("User not found"));
//        var role = roleRepository.findById(user.getId()).orElseThrow(() -> new ChangeSetPersister.NotFoundException());
//        Set<Role> roles = new HashSet<>();
//        roles.add(new Role(role.getName()));
//        user.setRoles(roles);
//        roles.stream().forEach(r ->
//          {
//            authorities.add(new SimpleGrantedAuthority(r.getName()));
//          }
//        );
//
//        UserDetails userDetails = userService.userDetailsService().loadUserByUsername(userEmail);
//        if (jwTtokenService.isTokenValidate(jwtToken, userDetails)) {
//          SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
//          UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userDetails, null, authorities);
//          authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
//          securityContext.setAuthentication(authToken);
//          SecurityContextHolder.setContext(securityContext);
//
////          SecurityContextHolder.getContext().setAuthentication(authToken);
//
//        }
//      } catch (Exception e) {
//        ErrorResponse errorResponse = new ErrorResponse(HttpStatus.FORBIDDEN, e.getMessage());
////        response.setContentType(APPLICATION_JSON_VALUE);
////        response.setStatus(errorResponse.getStatusCodeValue());
////        new ObjectMapper().writeValue(response.getOutputStream(), errorResponse);
//      }
//    } else {
//      filterChain.doFilter(request, response);
//    }
//
//
//  }

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
    String authHeader = request.getHeader("Authorization");
    String token = null;
    String username = null;
    if (authHeader != null && authHeader.startsWith("Bearer ")) {
      try {
        token = authHeader.substring(7);
        username = jwTtokenService.extractUserName(token);
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
          UserDetails userDetails = userDetailsService.loadUserByUsername(username);
          System.out.println(userDetails.getAuthorities());
          if (jwTtokenService.isTokenValidate(token, userDetails)) {
            SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
            UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
            authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            securityContext.setAuthentication(authToken);
            SecurityContextHolder.setContext(securityContext);
          } else {
            System.out.println("not valid token");
          }
        }
      } catch (Exception e) {
        ErrorResponse errorResponse = new ErrorResponse(HttpStatus.FORBIDDEN, e.getMessage());
        System.out.println(errorResponse);
        response.setContentType(APPLICATION_JSON_VALUE);
        response.setStatus(errorResponse.getStatusCodeValue());
        new ObjectMapper().writeValue(response.getOutputStream(), errorResponse);
      }
    }
    filterChain.doFilter(request, response);
  }
}
