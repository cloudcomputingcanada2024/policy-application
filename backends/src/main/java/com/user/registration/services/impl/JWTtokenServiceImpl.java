package com.user.registration.services.impl;

import com.user.registration.entities.User;
import com.user.registration.services.JWTtokenService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Collection;
import java.util.Date;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;


@Service
public class JWTtokenServiceImpl implements JWTtokenService {
  public static final String SECRET = "5367566B59703373367639792F423F4528482B4D6251655468576D5A71347437";
  @Value("${auth.app.jwtSecret}")
  private String jwtSecret;

  @Value("${auth.app.jwtExpirationMs}")
  private int jwtExpirationMs;

  public String generateToken(UserDetails userDetails) {
    System.out.println(userDetails.getAuthorities());
    return Jwts
      .builder()
      .setSubject(userDetails.getUsername())
      .claim("authorities", userDetails.getAuthorities())
      .setIssuedAt(new Date(System.currentTimeMillis()))
      .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationMs))
      .signWith(getSignKey(), SignatureAlgorithm.HS256)
      .compact();
  }

  public String generateRefreshToken(Map<String, Object> extraClaims, UserDetails userDetails) {

    return Jwts
      .builder()
      .setClaims(extraClaims)
      .setSubject(userDetails.getUsername())
      .setIssuedAt(new Date(System.currentTimeMillis()))
      .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationMs))
      .signWith(getSignKey(), SignatureAlgorithm.HS256)
      .compact();
  }


  public String extractUserName(String token) {
    return extractClaim(token, Claims::getSubject);
  }

  private <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
    final Claims claims = extractAllClaims(token);
    return claimsResolver.apply(claims);
  }

  public Claims extractAllClaims(String token) {
    return Jwts
      .parserBuilder()
      .setSigningKey(getSignKey())
      .build()
      .parseClaimsJws(token)
      .getBody();
  }

  public Boolean isTokenValidate(String token, UserDetails userDetails) {
    final String username = extractUserName(token);
    return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
  }

  private Boolean isTokenExpired(String token) {
    return extractClaim(token, Claims::getExpiration).before(new Date());
  }

  private Key getSignKey() {
    return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
//    byte[] keyBytes = Decoders.BASE64.decode(jwtSecret);
//    return Keys.hmacShaKeyFor(keyBytes);
    // byte[] key = Decoders.BASE64.decode("234dft4534Qf3wq4543r34r345rgi9764354798o0632xhigh6yt");
    //return Keys.hmacShaKeyFor(key);
  }
//  private Key key() {
//    return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
//  }
}
