package com.wecp.eventmanagementsystem.entity;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.Date;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "events") // do not change table name
public class Event {
    // implement entity

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long eventID;
    
    private String title;
    private String description;
    private Date dateTime;
    private String location;
    private String status;
    
    public Event() {}
    
    @OneToMany(mappedBy = "event" ,cascade=CascadeType.ALL)
    private List<Allocation> allocations;

    @OneToMany(mappedBy = "event",cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<Booking> bookings;

    
    public Set<Booking> getBookings() {
        return bookings;
    }

    public void setBookings(Set<Booking> bookings) {
        this.bookings = bookings;
    }

    public Long getEventID() {
        return eventID;
    }
    
    public void setEventID(Long eventID) {
        this.eventID = eventID;
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
 
}
