package com.hocinebouarara.order_management.service;

import com.hocinebouarara.order_management.dto.ProfileDto;

public interface ProfileService {
    ProfileDto getProfile(String username);
    void updateProfile(String username, ProfileDto dto);
}
