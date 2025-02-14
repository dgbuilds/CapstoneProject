package com.wecp.eventmanagementsystem.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import com.wecp.eventmanagementsystem.service.RequestService;
import com.wecp.eventmanagementsystem.entity.Request;

@RestController
public class RequestController {

    @Autowired
    private RequestService requestService;

    @GetMapping("/api/requests")
    public ResponseEntity<List<Request>> getRequest(){
        return new ResponseEntity<>(requestService.getRequests(),HttpStatus.OK);
    }

    @PostMapping("/api/request")
    public ResponseEntity<Request> createRequest(@RequestBody Request request){
        return new ResponseEntity<Request>(requestService.createRequest(request), HttpStatus.CREATED);
    }

    @GetMapping("/api/request/{requestId}")
    public ResponseEntity<Request> getRequest(@PathVariable Long requestId){
        return new ResponseEntity<Request>(requestService.getRequestById(requestId), HttpStatus.OK);
    }

    @DeleteMapping("/api/request/{requestId}")
    public ResponseEntity<?> deleteRequest(@PathVariable Long requestId){
        requestService.deleteRequest(requestId);
        return new ResponseEntity<String>("Deleted", HttpStatus.NO_CONTENT);
    }

    @GetMapping("/api/request")
    public ResponseEntity<List<Request>> getRequestStatus(@RequestParam String status){
        return new ResponseEntity<List<Request>>(requestService.getRequestByStatus(status),HttpStatus.OK);
    }

    @PutMapping("/api/request/{requestId}")
    public ResponseEntity<Request> updateRequest(@PathVariable Long requestId, @RequestBody String status){
        Request request = requestService.getRequestById(requestId);
        request.setStatus(status);
        return new ResponseEntity<Request>(requestService.updateRequest(requestId,request), HttpStatus.OK);
    }

}
