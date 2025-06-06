package com.pokermentor.service;

import com.pokermentor.entity.HandEntity;
import com.pokermentor.model.CreateHandRequest;
import com.pokermentor.model.Hand;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;

@Mapper(componentModel = "spring")
@Component
public interface HandMapper {
    
    @Mapping(target = "sessionId", source = "session.id")
    Hand toDto(HandEntity entity);
    
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "session", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    HandEntity toEntity(CreateHandRequest request);
}