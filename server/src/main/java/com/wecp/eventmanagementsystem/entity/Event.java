package com.wecp.eventmanagementsystem.entity;

import javax.persistence.*;


import java.util.Date;
import java.util.List;

@Entity
@Table(name = "events") // do not change table name
public class Event {
    // implement entity

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long eventID;
    
    private String type;
    private String title;
    private String description;
    private Date dateTime;
    private String location;
    private String status;
    private long tickets;
    
    
    @OneToMany(mappedBy = "event" ,cascade=CascadeType.ALL)
    private List<Allocation> allocations;


    public Event() {
    }

    
    public Event(Long eventID, String type, String title, String description, Date dateTime, String location,
            String status, long tickets, List<Allocation> allocations) {
        this.eventID = eventID;
        this.type = type;
        this.title = title;
        this.description = description;
        this.dateTime = dateTime;
        this.location = location;
        this.status = status;
        this.tickets = tickets;
        this.allocations = allocations;
    }

    
    public Long getEventID() {
        return eventID;
    }

    public void setEventID(Long eventID) {
        this.eventID = eventID;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getDateTime() {
        return dateTime;
    }

    public void setDateTime(Date dateTime) {
        this.dateTime = dateTime;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public List<Allocation> getAllocations() {
        return allocations;
    }

    public void setAllocations(List<Allocation> allocations) {
        this.allocations = allocations;
    }


    public long getTickets() {
        return tickets;
    }


    public void setTickets(long tickets) {
        this.tickets = tickets;
    }

}
