package com.wecp.eventmanagementsystem.jwt;
 
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
 
import com.wecp.eventmanagementsystem.entity.User;
import com.wecp.eventmanagementsystem.repository.UserRepository;
 
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

 
@Component
public class JwtUtil {
 
    private UserRepository userRepository;
 
    @Autowired
    public JwtUtil(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
 
    private final String secret = "secretKey000000000000000000000000000000000000000000000000000000000000000000000000000000000000000";
 
    private final int expiration = 86400;
 
    public String generateToken(String username) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + expiration * 1000);
        User user = userRepository.findByUsername(username).get();
 
        Map<String, Object> claims = new HashMap<>();
        System.out.println(user.getUserID());
        claims.put("username", username);
        claims.put("user_id",user.getUserID());
        claims.put("role", user.getRole());
        System.out.println(claims);
        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS512, secret)
                .compact();
    }
 
    public Claims extractAllClaims(String token) {
        Claims claims;
        try {
            claims = Jwts.parser()
                    .setSigningKey(secret)
                    .parseClaimsJws(token)
                    .getBody();
        } catch (Exception e) {
            claims = null;
        }
        return claims;
    }
 
    public String extractUsername(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(secret)
                .parseClaimsJws(token)
                .getBody();
        System.out.println(claims);
        //return claims.getSubject();
        return claims.get("username", String.class);
    }
 
    public boolean isTokenExpired(String token) {
        Date expirationDate = Jwts.parser()
                .setSigningKey(secret)
                .parseClaimsJws(token)
                .getBody()
                .getExpiration();
        return expirationDate.before(new Date());
    }
 
    public boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }
 
}
