package com.wecp.eventmanagementsystem.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;


@Entity
@Table(name = "clients")
public class Client {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private long bookedTickets;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "userID")
    private User user;

    
    @OneToMany(mappedBy = "client" , cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Request> requests = new ArrayList<>();
    
    @ManyToMany
    @JsonIgnore
    private List<Event> events = new ArrayList<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<Request> getRequests() {
        return requests;
    }

    public void setRequests(List<Request> requests) {
        this.requests = requests;
    }

    public List<Event> getEvents() {
        return events;
    }

    public void setEvents(List<Event> events) {
        this.events = events;
    }

    public Client() {
    }

    public long getBookedTickets() {
        return bookedTickets;
    }

    public void setBookedTickets(long bookedTickets) {
        this.bookedTickets = bookedTickets;
    }

    


    
}

