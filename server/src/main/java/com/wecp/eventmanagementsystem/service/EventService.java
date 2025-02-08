package com.wecp.eventmanagementsystem.service;


import com.wecp.eventmanagementsystem.entity.Event;
import com.wecp.eventmanagementsystem.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;
   
    public Event createEvent(Event event){
        return eventRepository.save(event);
    }
 
    public List<Event> getAllEvents(){
        return eventRepository.findAll();
    }
 
    public Event getEventById(Long eventId){
        return eventRepository.findById(eventId).orElseThrow(()->new RuntimeException("Event not found"));
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
 

}
