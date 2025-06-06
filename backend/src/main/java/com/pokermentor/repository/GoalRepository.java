package com.pokermentor.repository;

import com.pokermentor.entity.GoalEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface GoalRepository extends JpaRepository<GoalEntity, UUID> {
    
    List<GoalEntity> findAllByOrderByCreatedAtDesc();
    
    List<GoalEntity> findByCategory(GoalEntity.Category category);
    
    List<GoalEntity> findByProgressLessThan(Integer progress);
}