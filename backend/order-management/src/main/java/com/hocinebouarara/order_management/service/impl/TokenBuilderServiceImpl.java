package com.hocinebouarara.order_management.service.impl;

import com.hocinebouarara.order_management.dto.LoginResponse;
import com.hocinebouarara.order_management.dto.TokenUserDTO;
import com.hocinebouarara.order_management.security.JwtService;
import com.hocinebouarara.order_management.service.RoleService;
import com.hocinebouarara.order_management.service.TokenBuilderService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TokenBuilderServiceImpl implements TokenBuilderService {

    private final RoleService roleService;
    private final JwtService jwtService;

    @Override
    public LoginResponse buildLoginResponse(TokenUserDTO tokenUserDTO) {

        String token = jwtService.generateToken(tokenUserDTO);
        return new LoginResponse(token, tokenUserDTO);
    }
}
