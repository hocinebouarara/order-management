package com.hocinebouarara.order_management.service;

import com.hocinebouarara.order_management.dto.LoginResponse;
import com.hocinebouarara.order_management.dto.TokenUserDTO;

public interface TokenBuilderService {
    LoginResponse buildLoginResponse(TokenUserDTO tokenUserDTO);
}
