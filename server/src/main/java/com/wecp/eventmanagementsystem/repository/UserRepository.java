package com.wecp.eventmanagementsystem.repository;


import com.wecp.eventmanagementsystem.entity.User;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User , Long> {

    Optional<User> findByUsername(String username);
    boolean existsByUsername(String username);
    List<User> findUserByRole(String role);
}

