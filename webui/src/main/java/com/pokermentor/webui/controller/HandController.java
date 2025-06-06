package com.pokermentor.webui.controller;

import com.pokermentor.entity.HandEntity;
import com.pokermentor.entity.SessionEntity;
import com.pokermentor.model.CreateHandRequest;
import com.pokermentor.model.Hand;
import com.pokermentor.repository.HandRepository;
import com.pokermentor.repository.SessionRepository;
import com.pokermentor.service.HandMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1")
public class HandController {
    
    @Autowired
    private HandRepository handRepository;
    
    @Autowired
    private SessionRepository sessionRepository;
    
    @Autowired
    private HandMapper handMapper;
    
    @PostMapping("/sessions/{sessionId}/hands")
    public ResponseEntity<Hand> addHandToSession(
            @PathVariable UUID sessionId, 
            @RequestBody CreateHandRequest request) {
        
        try {
            // Find the session
            SessionEntity session = sessionRepository.findById(sessionId)
                    .orElseThrow(() -> new RuntimeException("Session not found"));
            
            // Create hand entity
            HandEntity handEntity = handMapper.toEntity(request);
            handEntity.setSession(session);
            
            // Save hand
            HandEntity saved = handRepository.save(handEntity);
            
            // Convert to DTO and return
            Hand handDto = handMapper.toDto(saved);
            return ResponseEntity.ok(handDto);
            
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }
    
    @GetMapping("/sessions/{sessionId}/hands")
    public ResponseEntity<List<Hand>> getSessionHands(@PathVariable UUID sessionId) {
        try {
            List<HandEntity> hands = handRepository.findBySessionIdOrderByCreatedAtDesc(sessionId);
            List<Hand> handDtos = hands.stream()
                    .map(handMapper::toDto)
                    .toList();
            return ResponseEntity.ok(handDtos);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }
}