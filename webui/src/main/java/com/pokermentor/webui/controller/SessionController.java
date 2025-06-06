package com.pokermentor.webui.controller;

import com.pokermentor.model.CreateSessionRequest;
import com.pokermentor.model.Session;
import com.pokermentor.service.SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1")
public class SessionController {
    
    @Autowired
    private SessionService sessionService;
    
    @PostMapping("/sessions")
    public ResponseEntity<Session> createSession(@RequestBody CreateSessionRequest request) {
        try {
            Session created = sessionService.createSession(request);
            return ResponseEntity.ok(created);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }
    
    @GetMapping("/sessions/{sessionId}")
    public ResponseEntity<Session> getSessionById(@PathVariable UUID sessionId) {
        return sessionService.getSessionById(sessionId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}