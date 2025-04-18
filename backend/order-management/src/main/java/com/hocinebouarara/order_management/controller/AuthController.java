package com.hocinebouarara.order_management.controller;


import com.hocinebouarara.order_management.dto.RegisterUserRequest;
import com.hocinebouarara.order_management.dto.UserDTO;
import com.hocinebouarara.order_management.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;

    /**
     * Registers a new user with the specified roles.
     *
     * @param request the request containing user registration data
     * @return the created user
     */
    @PostMapping("/register")
    public ResponseEntity<UserDTO> registerUser(@RequestBody RegisterUserRequest request) {
        UserDTO registeredUser = userService.registerUser(request);
        return ResponseEntity.ok(registeredUser);
    }
}
