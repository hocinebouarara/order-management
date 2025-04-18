package com.hocinebouarara.order_management.service;

import com.hocinebouarara.order_management.dto.LoginRequest;
import com.hocinebouarara.order_management.dto.LoginResponse;

public interface AuthService {
    LoginResponse login(LoginRequest request);
}
