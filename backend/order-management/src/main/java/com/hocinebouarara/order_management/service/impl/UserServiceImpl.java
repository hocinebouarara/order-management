package com.hocinebouarara.order_management.service.impl;

import com.hocinebouarara.order_management.dto.RegisterUserRequest;
import com.hocinebouarara.order_management.dto.UserDTO;
import com.hocinebouarara.order_management.mapper.UserMapper;
import com.hocinebouarara.order_management.model.entity.Role;
import com.hocinebouarara.order_management.model.entity.User;
import com.hocinebouarara.order_management.repository.RoleRepository;
import com.hocinebouarara.order_management.repository.UserRepository;
import com.hocinebouarara.order_management.service.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    private final UserMapper userMapper;

    private final RoleRepository roleRepository;

    private final PasswordEncoder passwordEncoder;

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
    public UserDTO registerUser(RegisterUserRequest request) {
        // convert request to user entity
        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        List<Role> roles = roleRepository.findAllById(request.getRoleIds());
        user.setRoles(roles);

        // save user
        User savedUser = userRepository.save(user);


        return userMapper.userToUserDTO(savedUser);
    }

}
