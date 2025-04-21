package com.hocinebouarara.order_management.service.impl;

import com.hocinebouarara.order_management.dto.UserDTO;
import com.hocinebouarara.order_management.mapper.UserMapper;
import com.hocinebouarara.order_management.model.entity.User;
import com.hocinebouarara.order_management.repository.UserRepository;
import com.hocinebouarara.order_management.service.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    private final UserMapper userMapper;


    @Override
    public UserDTO createUser(UserDTO userDTO) {
        // Map the DTO to the User entity
        User user = userMapper.userDTOToUser(userDTO);

        // Save the user entity to the database
        User savedUser = userRepository.save(user);

        // Return the saved user as DTO
        return userMapper.userToUserDTO(savedUser);
    }

    @Override
    public List<UserDTO> getAllUsers() {
        // Fetch all users from the repository and map them to DTOs
        return userMapper.usersToUserDTOs(userRepository.findAll());
    }

    @Override
    public UserDTO getUserById(Long id) {
        // Fetch user by ID and map it to DTO
        return userRepository.findById(id)
                .map(userMapper::userToUserDTO)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Override
    public void deleteUser(Long id) {
        // Delete the user from the repository by ID
        userRepository.deleteById(id);
    }

    @Override
    public UserDTO getUserByEmail(String email) {
        // Fetch user by username and map it to DTO
        return userRepository.findByEmail(email)
                .map(userMapper::userToUserDTO)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

}
