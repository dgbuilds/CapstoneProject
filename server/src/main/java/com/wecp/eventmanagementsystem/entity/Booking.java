package com.wecp.eventmanagementsystem.entity;


import java.util.Date;

import javax.persistence.*;


@Entity
@Table(name="bookingDetails")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookingID;
    private String title;
    private String description;
    private Date dateTime;
    private String location;
    private long expectedCount;
    private String status;
    @ManyToOne
    @JoinColumn(name="eventID",nullable = false)
    private Event event;

    public Booking() {
    }

    public Booking(Long bookingID, String title, String description, Date dateTime, String location, long expectedCount,
            Event event) {
        this.bookingID = bookingID;
        this.title = title;
        this.description = description;
        this.dateTime = dateTime;
        this.location = location;
        this.expectedCount = expectedCount;
        this.event = event;
    }

    
    public Long getBookingID() {
        return bookingID;
    }

    public void setBookingID(Long bookingID) {
        this.bookingID = bookingID;
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

    public long getExceptedCount() {
        return expectedCount;
    }

    public void setExceptedCount(long expectedCount) {
        this.expectedCount = expectedCount;
    }

    public Event getEvent() {
        return event;
    }

    public void setEvent(Event event) {
        this.event = event;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    

    


    


    
}
