package com.wecp.eventmanagementsystem.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import com.wecp.eventmanagementsystem.service.BookingService;
import com.wecp.eventmanagementsystem.entity.Booking;

@RestController
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @GetMapping("/api/bookings")
    public ResponseEntity<List<Booking>> getBooking(){
        return new ResponseEntity<>(bookingService.getBookings(),HttpStatus.OK);
    }

    @PostMapping("/api/bookings")
    public ResponseEntity<Booking> createBooking(@RequestBody Booking booking){
        return new ResponseEntity<Booking>(bookingService.createBooking(booking), HttpStatus.CREATED);
    }

    @GetMapping("/api/booking/{bookingId}")
    public ResponseEntity<Booking> getBooking(@PathVariable Long bookingId){
        return new ResponseEntity<Booking>(bookingService.getBookingById(bookingId), HttpStatus.OK);
    }

    @DeleteMapping("/api/booking/{bookingId}")
    public ResponseEntity<?> deleteBooking(@PathVariable Long bookingId){
        bookingService.deleteBooking(bookingId);
        return new ResponseEntity<String>("Deleted", HttpStatus.NO_CONTENT);
    }

    @GetMapping("/api/booking")
    public ResponseEntity<List<Booking>> getBookingStatus(@RequestParam String status){
        return new ResponseEntity<List<Booking>>(bookingService.getBookingByStatus(status),HttpStatus.OK);
    }
    
}
