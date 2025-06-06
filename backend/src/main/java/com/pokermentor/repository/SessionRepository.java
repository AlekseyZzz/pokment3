package com.pokermentor.repository;

import com.pokermentor.entity.SessionEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Repository
public interface SessionRepository extends JpaRepository<SessionEntity, UUID> {
    
    Page<SessionEntity> findAllByOrderByCreatedAtDesc(Pageable pageable);
    
    List<SessionEntity> findByCreatedAtBetween(LocalDateTime start, LocalDateTime end);
    
    @Query("SELECT s FROM SessionEntity s WHERE s.performanceGrade = :grade")
    List<SessionEntity> findByPerformanceGrade(SessionEntity.PerformanceGrade grade);
    
    @Query("SELECT AVG(s.profit) FROM SessionEntity s WHERE s.createdAt >= :since")
    Double getAverageProfitSince(LocalDateTime since);
}