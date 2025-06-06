package com.pokermentor.service;

import com.pokermentor.entity.SessionEntity;
import com.pokermentor.model.CreateSessionRequest;
import com.pokermentor.model.Session;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;

@Mapper(componentModel = "spring")
@Component
public interface SessionMapper {
    
    Session toDto(SessionEntity entity);
    
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "hands", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    SessionEntity toEntity(CreateSessionRequest request);
}