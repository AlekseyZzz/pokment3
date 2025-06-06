package com.pokermentor.repository;

import com.pokermentor.entity.HandEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface HandRepository extends JpaRepository<HandEntity, UUID> {
    
    List<HandEntity> findBySessionIdOrderByCreatedAtDesc(UUID sessionId);
    
    List<HandEntity> findByPriority(HandEntity.Priority priority);
    
    List<HandEntity> findBySpotType(String spotType);
}