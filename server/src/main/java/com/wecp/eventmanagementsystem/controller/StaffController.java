package com.wecp.eventmanagementsystem.controller;


import com.wecp.eventmanagementsystem.entity.Event;
import com.wecp.eventmanagementsystem.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class StaffController {

    @Autowired
    private EventService eventService;

    @GetMapping("/api/staff/event-details/{eventId}")
    public ResponseEntity<Event> getEventDetails(@PathVariable Long eventId) {
        return new ResponseEntity<Event>(eventService.getEventById(eventId),HttpStatus.OK);

    }

    @PutMapping("/api/staff/update-setup/{eventId}")
    public ResponseEntity<Event> updateEventSetup(@PathVariable Long eventId, @RequestBody Event updatedEvent) {
        return new ResponseEntity<Event>(eventService.updateEvent(eventId, updatedEvent),HttpStatus.OK);
    }
}
