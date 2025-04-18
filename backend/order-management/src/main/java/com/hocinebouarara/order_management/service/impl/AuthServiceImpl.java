package com.hocinebouarara.order_management.service.impl;

import com.hocinebouarara.order_management.dto.LoginRequest;
import com.hocinebouarara.order_management.dto.LoginResponse;
import com.hocinebouarara.order_management.model.entity.User;
import com.hocinebouarara.order_management.repository.UserRepository;
import com.hocinebouarara.order_management.security.JwtService;
import com.hocinebouarara.order_management.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;




    @Override
    public LoginResponse login(LoginRequest request) {
        // 1. Find user by username/email
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        // 2. Check password using PasswordEncoder
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new BadCredentialsException("Invalid password");
        }

        // 3. Generate JWT token
        String token = jwtService.generateToken(user.getUsername());

        // 4. Return token
        return new LoginResponse(token);
    }


}
