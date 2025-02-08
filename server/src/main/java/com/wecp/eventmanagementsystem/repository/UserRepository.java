package com.wecp.eventmanagementsystem.repository;


import com.wecp.eventmanagementsystem.entity.User;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User , Long> {
    // extend jpa repository and add custom method if needed
    Optional<User> findByUsername(String username);
    boolean existsByUsername(String username);
}

