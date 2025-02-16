package com.wecp.eventmanagementsystem.service;

import com.wecp.eventmanagementsystem.entity.Client;
import com.wecp.eventmanagementsystem.entity.Event;
import com.wecp.eventmanagementsystem.repository.ClientRepository;
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

    @Autowired
    private ClientRepository clientRepository;

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
    public Map<Boolean, String> bookTicketsForClient(Long eventId, Long userId, Long clientId, Integer tickets) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found"));
        Client client = clientRepository.findById(clientId)
                .orElseThrow(() -> new RuntimeException("Client not found"));
    
        if (event.getTickets() < tickets) {
            throw new RuntimeException("Not enough tickets available");
        }
    
        // Get current tickets for this client and add new tickets
        Long currentTickets = event.getClientTickets().getOrDefault(userId, 0L);
        Long newTotalTickets = currentTickets + tickets;
        client.setBookedTickets(newTotalTickets);
        // Update the tickets count for this client
        event.getClientTickets().put(userId, newTotalTickets);
        event.setTickets(event.getTickets() - tickets);
        
        event.getClients().add(client);
        client.getEvents().add(event);
    
        eventRepository.save(event);
        clientRepository.save(client);
    
        Map<Boolean, String> result = new HashMap<>();
        result.put(true, "Successfully booked " + tickets + " tickets for client");
        return result;
    }
    
    
    public Map<Event, Long> getClientBookedEventsAndTickets(Long clientId) {
        Client client = clientRepository.findById(clientId)
                .orElseThrow(() -> new RuntimeException("Client not found"));
    
        Map<Event, Long> eventTicketsMap = new HashMap<>();
        
        for (Event event : client.getEvents()) {
            Long ticketCount = event.getClientTickets().getOrDefault(clientId, 0L);
            eventTicketsMap.put(event, ticketCount);
        }
        
        return eventTicketsMap;
    }
    
    public Long getCLientId(long userId){
        return clientRepository.findClientByUserId(userId).getId();
    }
    
    

}
