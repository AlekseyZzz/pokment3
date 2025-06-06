package com.pokermentor.controller;

import com.pokermentor.api.SessionsApi;
import com.pokermentor.model.CreateSessionRequest;
import com.pokermentor.model.Session;
import com.pokermentor.model.SessionPage;
import com.pokermentor.service.SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
public class SessionController implements SessionsApi {
    
    @Autowired
    private SessionService sessionService;
    
    @Override
    public ResponseEntity<SessionPage> getSessions(Integer page, Integer size, String sort) {
        String[] sortParts = sort.split(",");
        Sort.Direction direction = sortParts.length > 1 && "desc".equals(sortParts[1]) 
            ? Sort.Direction.DESC : Sort.Direction.ASC;
        
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortParts[0]));
        Page<Session> sessions = sessionService.getAllSessions(pageable);
        
        SessionPage response = new SessionPage();
        response.setContent(sessions.getContent());
        response.setTotalElements(sessions.getTotalElements());
        response.setTotalPages(sessions.getTotalPages());
        response.setSize(sessions.getSize());
        response.setNumber(sessions.getNumber());
        
        return ResponseEntity.ok(response);
    }
    
    @Override
    public ResponseEntity<Session> createSession(CreateSessionRequest createSessionRequest) {
        Session created = sessionService.createSession(createSessionRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
    
    @Override
    public ResponseEntity<Session> getSessionById(UUID sessionId) {
        return sessionService.getSessionById(sessionId)
                .map(session -> ResponseEntity.ok(session))
                .orElse(ResponseEntity.notFound().build());
    }
}