package com.wecp.eventmanagementsystem.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.wecp.eventmanagementsystem.entity.Booking;

@Repository
public interface BookingRepository extends JpaRepository<Booking,Long>{

    List<Booking> findBookingByStatus(String status);
    
    
}
