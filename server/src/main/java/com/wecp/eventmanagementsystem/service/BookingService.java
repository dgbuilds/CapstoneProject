package com.wecp.eventmanagementsystem.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wecp.eventmanagementsystem.entity.Booking;
import com.wecp.eventmanagementsystem.repository.BookingRepository;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    public List<Booking> getBookings(){
        return bookingRepository.findAll();

    }

    public Booking getBookingById(Long bookingId){
        return bookingRepository.findById(bookingId).get();
    }

    public List<Booking> getBookingByStatus(String status){
        return bookingRepository.findBookingByStatus(status);
    }

    public Booking createBooking(Booking booking){
        return bookingRepository.save(booking);
    }

    public void deleteBooking(Long bookingId){
        System.out.println(bookingId);
        bookingRepository.deleteById(bookingId);
    }

    public Booking updateBooking(Long bookingId, Booking booking) {
        return bookingRepository.save(booking);
    }
    
}
