package com.th.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.th.entity.Vendor;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;
import java.util.Base64;

@Service
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secretKey;

    @Value("${jwt.expiration}")
    private long jwtExpiration;
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                   .setSigningKey(Base64.getEncoder().encodeToString(secretKey.getBytes()))
                   .parseClaimsJws(token)
                   .getBody();
    }

    public Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public String generateToken(String id, String username, String email,String city, String role) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("id", id);
        claims.put("username", username);
        claims.put("email", email);
        claims.put("city", city);
        claims.put("role", role);
        return createToken(claims, email);
    }
    
    public String generateTokenVendor(String id, String username, String email,String city, String status ,String role) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("id", id);
        claims.put("username", username);
        claims.put("email", email);
        claims.put("city", city);
        claims.put("status", status);
        claims.put("role", role);
        return createToken(claims, email);
    }
    
    public String generateTokenadmin(String id, String username, String email, String role) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("id", id);
        claims.put("username", username);
        claims.put("email", email);
        claims.put("role", role);
        return createToken(claims, email);
    }
    
    public String generateTokenForgotPassword(String email) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("email", email);
        return createToken(claims, email);
    }

    private String createToken(Map<String, Object> claims, String subject) {
        return Jwts.builder()
                   .setClaims(claims)
                   .setSubject(subject)
                   .setIssuedAt(new Date(System.currentTimeMillis()))
                   .setExpiration(new Date(System.currentTimeMillis() + jwtExpiration))
                   .signWith(SignatureAlgorithm.HS256, Base64.getEncoder().encodeToString(secretKey.getBytes()))
                   .compact();
    }

    public Boolean validateToken(String token, String email) {
        final String extractedUsername = extractUsername(token);
        return (extractedUsername.equals(email) && !isTokenExpired(token));
    }
    
    public String extractEmail(String token) {
    	System.out.println(token);
        return extractClaim(token, Claims::getSubject);
    }
}
