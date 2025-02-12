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
    private long exceptedCount;
    private String status;
    @ManyToOne
    private Event event;

    public Booking() {
    }

    public Booking(Long bookingID, String title, String description, Date dateTime, String location, long exceptedCount,
            Event event) {
        this.bookingID = bookingID;
        this.title = title;
        this.description = description;
        this.dateTime = dateTime;
        this.location = location;
        this.exceptedCount = exceptedCount;
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
        return exceptedCount;
    }

    public void setExceptedCount(long exceptedCount) {
        this.exceptedCount = exceptedCount;
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
