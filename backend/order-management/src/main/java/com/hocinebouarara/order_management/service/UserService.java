package com.hocinebouarara.order_management.service;

import com.hocinebouarara.order_management.dto.RegisterUserRequest;
import com.hocinebouarara.order_management.dto.UserDTO;

import java.util.List;

public interface UserService {

    // Create a new user
    UserDTO createUser(UserDTO userDTO);

    // Get all users
    List<UserDTO> getAllUsers();

    // Get a user by its ID
    UserDTO getUserById(Long id);

    // Delete a user by its ID
    void deleteUser(Long id);

    /**
     * Registers a new user with specified roles.
     *
     * @param request the user registration request containing user info and role IDs
     * @return the saved user as DTO
     */
    UserDTO registerUser(RegisterUserRequest request);

}
