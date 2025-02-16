package com.wecp.eventmanagementsystem.controller;

import com.wecp.eventmanagementsystem.entity.Allocation;
import com.wecp.eventmanagementsystem.entity.Event;
import com.wecp.eventmanagementsystem.entity.Resource;
import com.wecp.eventmanagementsystem.service.EventService;
import com.wecp.eventmanagementsystem.service.ResourceService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
public class EventPlannerController {

    @Autowired
    private EventService eventService;

    @Autowired
    private ResourceService resourceService;

    @PostMapping("/api/planner/event")
    public ResponseEntity<Event> createEvent(@RequestBody Event event) {
        return new ResponseEntity<Event>(eventService.createEvent(event), HttpStatus.CREATED);
    }

    @GetMapping("/api/planner/events")
    public ResponseEntity<List<Event>> getAllEvents() {
        return new ResponseEntity<>(eventService.getAllEvents(), HttpStatus.OK);
    }

    @PostMapping("/api/planner/resource")
    public ResponseEntity<Resource> addResource(@RequestBody Resource resource) {
        return new ResponseEntity<Resource>(resourceService.addResource(resource), HttpStatus.CREATED);
    }

    @GetMapping("/api/planner/resources")
    public ResponseEntity<List<Resource>> getAllResources() {
        return ResponseEntity.ok(resourceService.getAllResources());
    }

    @PostMapping("/api/planner/allocate-resources")
    public ResponseEntity<String> allocateResources(@RequestParam Long eventId, @RequestParam Long resourceId,
            @RequestBody Allocation allocation) {
        resourceService.allocateResource(eventId, resourceId, allocation.getQuantity());
        return new ResponseEntity<>("{\"message\": \"Resource allocated successfully for Event ID: " + eventId + "\"}",
                HttpStatus.CREATED);
    }

    @GetMapping("/api/events")
    public ResponseEntity<List<Event>> getEventByType(@RequestParam String status) {
        return new ResponseEntity<List<Event>>(eventService.getEventByType(status), HttpStatus.OK);
    }

    @GetMapping("/{eventId}/check-tickets/{requestedTickets}")
    public ResponseEntity<Map<String, Object>> checkTicketAvailability(
            @PathVariable Long eventId,
            @PathVariable Integer requestedTickets) {
        Map<String, Object> response = eventService.checkTicketAvailability(eventId, requestedTickets);
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/{eventId}/book")
    public ResponseEntity<Map<Boolean, String>> bookTickets(
            @PathVariable Long eventId,
            @RequestBody Integer tickets) { 
        Map<Boolean, String> response = eventService.bookTickets(eventId, tickets);
        return ResponseEntity.ok(response);
    }
    
}
