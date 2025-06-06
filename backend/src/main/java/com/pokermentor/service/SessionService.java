package com.pokermentor.service;

import com.pokermentor.entity.SessionEntity;
import com.pokermentor.model.CreateSessionRequest;
import com.pokermentor.model.Session;
import com.pokermentor.repository.SessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
public class SessionService {
    
    @Autowired
    private SessionRepository sessionRepository;
    
    @Autowired
    private SessionMapper sessionMapper;
    
    public Page<Session> getAllSessions(Pageable pageable) {
        Page<SessionEntity> entities = sessionRepository.findAllByOrderByCreatedAtDesc(pageable);
        return entities.map(sessionMapper::toDto);
    }
    
    public Optional<Session> getSessionById(UUID id) {
        return sessionRepository.findById(id)
                .map(sessionMapper::toDto);
    }
    
    public Session createSession(CreateSessionRequest request) {
        SessionEntity entity = sessionMapper.toEntity(request);
        SessionEntity saved = sessionRepository.save(entity);
        return sessionMapper.toDto(saved);
    }
    
    public void deleteSession(UUID id) {
        sessionRepository.deleteById(id);
    }
}