package com.hocinebouarara.order_management.service;

import com.hocinebouarara.order_management.dto.LoginRequest;
import com.hocinebouarara.order_management.dto.LoginResponse;
import com.hocinebouarara.order_management.dto.RegisterUserRequest;

public interface AuthService {

    /**
     * Registers a new user with specified roles.
     *
     * @param request the user registration request containing user info and role IDs
     * @return the saved user as DTO
     */
    LoginResponse registerUser(RegisterUserRequest request);

    LoginResponse login(LoginRequest request);
}
