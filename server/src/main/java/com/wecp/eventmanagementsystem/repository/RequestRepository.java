package com.wecp.eventmanagementsystem.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.wecp.eventmanagementsystem.entity.Request;

@Repository
public interface RequestRepository extends JpaRepository<Request,Long>{

    List<Request> findRequestByStatus(String status);
    
    
}
