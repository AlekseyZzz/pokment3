package com.pokermentor.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "hands")
public class HandEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "session_id", nullable = false)
    private SessionEntity session;
    
    @Column(name = "description", columnDefinition = "TEXT")
    private String description;
    
    @Column(name = "initial_thought", columnDefinition = "TEXT")
    private String initialThought;
    
    @Column(name = "adaptive_thought", columnDefinition = "TEXT")
    private String adaptiveThought;
    
    @Column(name = "for_arguments", columnDefinition = "TEXT")
    private String forArguments;
    
    @Column(name = "against_arguments", columnDefinition = "TEXT")
    private String againstArguments;
    
    @Column(name = "spot_type")
    private String spotType;
    
    @Column(name = "position")
    private String position;
    
    @ElementCollection
    @CollectionTable(name = "hand_tags", joinColumns = @JoinColumn(name = "hand_id"))
    @Column(name = "tag")
    private List<String> tags;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "priority")
    private Priority priority;
    
    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    // Constructors
    public HandEntity() {}
    
    // Getters and Setters
    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    
    public SessionEntity getSession() { return session; }
    public void setSession(SessionEntity session) { this.session = session; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public String getInitialThought() { return initialThought; }
    public void setInitialThought(String initialThought) { this.initialThought = initialThought; }
    
    public String getAdaptiveThought() { return adaptiveThought; }
    public void setAdaptiveThought(String adaptiveThought) { this.adaptiveThought = adaptiveThought; }
    
    public String getForArguments() { return forArguments; }
    public void setForArguments(String forArguments) { this.forArguments = forArguments; }
    
    public String getAgainstArguments() { return againstArguments; }
    public void setAgainstArguments(String againstArguments) { this.againstArguments = againstArguments; }
    
    public String getSpotType() { return spotType; }
    public void setSpotType(String spotType) { this.spotType = spotType; }
    
    public String getPosition() { return position; }
    public void setPosition(String position) { this.position = position; }
    
    public List<String> getTags() { return tags; }
    public void setTags(List<String> tags) { this.tags = tags; }
    
    public Priority getPriority() { return priority; }
    public void setPriority(Priority priority) { this.priority = priority; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public enum Priority {
        HIGH, MEDIUM, LOW
    }
}