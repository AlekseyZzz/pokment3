package com.pokermentor.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "sessions")
public class SessionEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "game_type", nullable = false)
    private GameType gameType;
    
    @Column(name = "stakes")
    private String stakes;
    
    @Column(name = "duration")
    private Integer duration;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "performance_grade")
    private PerformanceGrade performanceGrade;
    
    @Column(name = "mental_state")
    private String mentalState;
    
    @Column(name = "energy_level")
    private Integer energyLevel;
    
    @Column(name = "profit")
    private Double profit;
    
    @OneToMany(mappedBy = "session", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<HandEntity> hands = new ArrayList<>();
    
    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    // Constructors
    public SessionEntity() {}
    
    // Getters and Setters
    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    
    public GameType getGameType() { return gameType; }
    public void setGameType(GameType gameType) { this.gameType = gameType; }
    
    public String getStakes() { return stakes; }
    public void setStakes(String stakes) { this.stakes = stakes; }
    
    public Integer getDuration() { return duration; }
    public void setDuration(Integer duration) { this.duration = duration; }
    
    public PerformanceGrade getPerformanceGrade() { return performanceGrade; }
    public void setPerformanceGrade(PerformanceGrade performanceGrade) { this.performanceGrade = performanceGrade; }
    
    public String getMentalState() { return mentalState; }
    public void setMentalState(String mentalState) { this.mentalState = mentalState; }
    
    public Integer getEnergyLevel() { return energyLevel; }
    public void setEnergyLevel(Integer energyLevel) { this.energyLevel = energyLevel; }
    
    public Double getProfit() { return profit; }
    public void setProfit(Double profit) { this.profit = profit; }
    
    public List<HandEntity> getHands() { return hands; }
    public void setHands(List<HandEntity> hands) { this.hands = hands; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
    
    public enum GameType {
        CASH, TOURNAMENT
    }
    
    public enum PerformanceGrade {
        A, B, C, D
    }
}