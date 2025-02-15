package com.wecp.eventmanagementsystem.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wecp.eventmanagementsystem.entity.Client;
import com.wecp.eventmanagementsystem.entity.Request;
import com.wecp.eventmanagementsystem.repository.ClientRepository;
import com.wecp.eventmanagementsystem.repository.RequestRepository;

@Service
public class RequestService {

    @Autowired
    private RequestRepository requestRepository;

    @Autowired
    private ClientRepository clientRepository;

    public List<Request> getRequests() {
        return requestRepository.findAll();

    }

    public Request getRequestById(Long bookingId) {
        return requestRepository.findById(bookingId).get();
    }

    public List<Request> getRequestByStatus(String status) {
        return requestRepository.findRequestByStatus(status);
    }

    public Request createRequest(Request booking) {
        return requestRepository.save(booking);
    }

    public void deleteRequest(Long bookingId) {
        System.out.println(bookingId);
        requestRepository.deleteById(bookingId);
    }

    public Request updateRequest(Long requestId, Request request) {
        return requestRepository.save(request);
    }

    public List<Request> getClientRequests(Long clientId) {
        Client client = clientRepository.findById(clientId)
                .orElseThrow(() -> new RuntimeException("Client not found"));
        return client.getRequests();
    }

    public Request createRequestForClient(Request request, Long clientId) {
        Client client = clientRepository.findById(clientId)
                .orElseThrow(() -> new RuntimeException("Client not found"));
        request.setClient(client);
        Request savedRequest = requestRepository.save(request);
        client.getRequests().add(savedRequest);
        clientRepository.save(client);
        return savedRequest;
    }

}
