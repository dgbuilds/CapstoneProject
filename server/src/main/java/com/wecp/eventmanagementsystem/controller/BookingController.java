package com.wecp.eventmanagementsystem.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
        System.out.println("================================================");
        System.out.println(booking.getExceptedCount());
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

    @PutMapping("/api/booking/{bookingId}")
    public ResponseEntity<Booking> updateBooking(@PathVariable Long bookingId, @RequestBody String status){
        Booking booking = bookingService.getBookingById(bookingId);
        System.out.println(status);
        if(status == "reject"){
            bookingService.deleteBooking(bookingId);
        }
        booking.setStatus(status);
        return new ResponseEntity<Booking>(bookingService.updateBooking(bookingId,booking), HttpStatus.OK);
    }

}
