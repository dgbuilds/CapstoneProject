package com.wecp.eventmanagementsystem.controller;

import com.wecp.eventmanagementsystem.entity.Event;
import com.wecp.eventmanagementsystem.entity.Request;
import com.wecp.eventmanagementsystem.service.EventService;
import com.wecp.eventmanagementsystem.service.RequestService;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/client")
public class ClientController {

    @Autowired
    private EventService eventService;

    @Autowired
    private RequestService requestService;

    @PostMapping("/{userId}/events/{eventId}/book")
    public ResponseEntity<Map<Boolean, String>> bookEventTickets(
            @PathVariable Long userId,
            @PathVariable Long eventId,
            @RequestBody Integer tickets) {
        long clientId = eventService.getCLientId(userId);
        Map<Boolean, String> response = eventService.bookTicketsForClient(eventId, userId, clientId, tickets);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{userId}/events")
    public ResponseEntity<Map<Event, Long>> getClientBookedEvents(@PathVariable Long userId) {
        long clientId = eventService.getCLientId(userId);
        Map<Event, Long> eventsBooked = eventService.getClientBookedEventsAndTickets(clientId);
        return ResponseEntity.ok(eventsBooked);
    }

    @GetMapping("/{userId}/requests")
    public ResponseEntity<List<Request>> getClientRequests(@PathVariable Long userId) {
        long clientId = eventService.getCLientId(userId);
        List<Request> requests = requestService.getClientRequests(clientId);
        return ResponseEntity.ok(requests);
    }

    @PostMapping("/{userId}/request")
    public ResponseEntity<Request> createClientRequest(
            @PathVariable Long userId,
            @RequestBody Request request) {
        long clientId = eventService.getCLientId(userId);
        Request createdRequest = requestService.createRequestForClient(request, clientId);

        return new ResponseEntity<>(createdRequest, HttpStatus.CREATED);
    }


}
