package com.wecp.eventmanagementsystem.entity;


import java.util.Date;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;



@Entity
@Table(name="requests")
public class Request {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long requestId;
    private String name;
    private String description;
    private Date preferredDate;
    private String preferredLocation;
    private long expectedPeople;
    private String status;

    @ManyToOne
    @JsonIgnore
    private Client client;
    

    public Request() {
    }

    
    public Request(Long requestId, String name, String description, Date preferredDate, String preferredLocation,
            long expectedPeople, String status) {
        this.requestId = requestId;
        this.name = name;
        this.description = description;
        this.preferredDate = preferredDate;
        this.preferredLocation = preferredLocation;
        this.expectedPeople = expectedPeople;
        this.status = status;
    }


    public Long getRequestId() {
        return requestId;
    }

    public void SetRequestId(Long requestId) {
        this.requestId = requestId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getPreferredDate() {
        return preferredDate;
    }

    public void setPreferredDate(Date preferredDate) {
        this.preferredDate = preferredDate;
    }

    public String getPreferredLocation() {
        return preferredLocation;
    }

    public void setPreferredLocation(String preferredLocation) {
        this.preferredLocation = preferredLocation;
    }

    public long getExpectedPeople() {
        return expectedPeople;
    }

    public void setExpectedPeople(long expectedPeople) {
        this.expectedPeople = expectedPeople;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }


    public void setRequestId(Long requestId) {
        this.requestId = requestId;
    }


    public Client getClient() {
        return client;
    }


    public void setClient(Client client) {
        this.client = client;
    }

    

    

    
}
