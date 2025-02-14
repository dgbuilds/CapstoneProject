package com.wecp.eventmanagementsystem.service;

import com.wecp.eventmanagementsystem.entity.Event;
import com.wecp.eventmanagementsystem.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    public Event createEvent(Event event) {
        return eventRepository.save(event);
    }

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public Event getEventById(Long eventId) {
        return eventRepository.findById(eventId).orElseThrow(() -> new RuntimeException("Event not found"));
    }

    public Event updateEvent(Long eventId, Event eventDetails) {
        Event event = getEventById(eventId);
        event.setTitle(eventDetails.getTitle());
        event.setDescription(eventDetails.getDescription());
        event.setDateTime(eventDetails.getDateTime());
        event.setLocation(eventDetails.getLocation());
        event.setStatus(eventDetails.getStatus());
        return eventRepository.save(event);
    }

    public List<Event> getEventByType(String type) {
        return eventRepository.findEventByType(type);
    }

    public Map<String, Object> checkTicketAvailability(Long eventId, Integer requestedTickets) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found"));

        Map<String, Object> response = new HashMap<>();
        response.put("available", event.getTickets() >= requestedTickets);
        response.put("availableTickets", event.getTickets());

        return response;
    }

    @Transactional
    public Map<Boolean, String> bookTickets(Long eventId, Integer tickets) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found"));

        if (event.getTickets() < tickets) {
            throw new RuntimeException("Not enough tickets available");
        }

        event.setTickets(event.getTickets() - tickets);
        eventRepository.save(event);
        Map<Boolean, String> result = new HashMap<>();
        result.put(true, "Successfully booked " + tickets + " tickets");
        return result;
    }

}
