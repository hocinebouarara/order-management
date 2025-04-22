package com.hocinebouarara.order_management.service.impl;

import com.hocinebouarara.order_management.dto.*;
import com.hocinebouarara.order_management.exception.MultipleFieldConflictException;
import com.hocinebouarara.order_management.mapper.UserMapper;
import com.hocinebouarara.order_management.model.entity.Company;
import com.hocinebouarara.order_management.model.entity.Role;
import com.hocinebouarara.order_management.model.entity.Seller;
import com.hocinebouarara.order_management.model.entity.User;
import com.hocinebouarara.order_management.repository.CompanyRepository;
import com.hocinebouarara.order_management.repository.RoleRepository;
import com.hocinebouarara.order_management.repository.SellerRepository;
import com.hocinebouarara.order_management.repository.UserRepository;
import com.hocinebouarara.order_management.service.AuthService;
import com.hocinebouarara.order_management.service.RoleService;
import com.hocinebouarara.order_management.service.TokenBuilderService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final CompanyRepository companyRepository;
    private final SellerRepository sellerRepository;
    private final RoleRepository roleRepository;
    private final RoleService roleService;
    private final TokenBuilderService tokenBuilderService;

    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;



    @Override
    @Transactional
    public LoginResponse registerUser(RegisterUserRequest request) {

        List<String> errors = new ArrayList<>();

        // 1. Check if the email or username already exists
        if (userRepository.existsByUsername(request.getUsername())) {
            errors.add("Username already exists");
            //throw new UsernameAlreadyExistsException("Username is already in use.");
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            errors.add("Email already exists");
            //throw new EmailAlreadyExistsException("Email is already in use.");
        }

        if (!errors.isEmpty()) {
            throw new MultipleFieldConflictException(errors);
        }

        // 2. Create User entity from request
        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        // 3. Get role and assign it to user
        Optional<Role> role = roleRepository.findByName("ROLE_" + request.getUserType().toUpperCase());
        user.setRoles(role.stream().toList());




        // 4. Save User
        User savedUser = userRepository.save(user);

        // 5. Based on userType, create Seller or Company
        if ("SELLER".equalsIgnoreCase(request.getUserType())) {
            Seller seller = new Seller();
            seller.setUser(savedUser);
            seller.setFullName(request.getUsername());
            seller.setEmail(request.getEmail());
            // seller.setShopName(request.getBusinessName());
            // seller.setWilaya(request.getWilaya());
            // seller.setAddress(request.getAddress());
            // seller.setPhonePage(request.getPhone());
            // seller.setPhoneAlt(request.getPhoneAlt());

            sellerRepository.save(seller);
        } else if ("COMPANY".equalsIgnoreCase(request.getUserType())) {
            Company company = new Company();
            company.setUser(savedUser);
            company.setManagerName(request.getUsername());
            company.setEmail(request.getEmail());
            // company.setName(request.getBusinessName());
            // company.setWilaya(request.getWilaya());
            // company.setAddress(request.getAddress());
            // company.setPhone(request.getPhone());
            // company.setPhoneAlt(request.getPhoneAlt());

            companyRepository.save(company);
        } else {
            throw new IllegalArgumentException("Invalid userType: " + request.getUserType());
        }

        // 3. Map user to UserDTO
        //UserDTO userDTO = userMapper.userToUserDTO(user);

        List<String> roleNames = new ArrayList<>();
        roleNames.add(request.getUserType());

        TokenUserDTO tokenUserDTO = new TokenUserDTO(
                user.getId(),
                request.getUsername(),
                request.getEmail(),
                roleNames
        );

        // 4. Build LoginResponse using tokenBuilderService
        return tokenBuilderService.buildLoginResponse(tokenUserDTO);
    }




    @Override
    public LoginResponse login(LoginRequest request) {
        // 1. Find user by username/email
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        UserDTO userDTO = userMapper.userToUserDTO(user);

        // 2. Check password using PasswordEncoder
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new BadCredentialsException("Invalid password");
        }

        List<Role> roles= user.getRoles();
        List<String> roleNames = roles.stream()
                .map(role -> role.getName().toString()) // أو role.getName().name() لو كان Enum
                .collect(Collectors.toList());


        // 4. Build LoginResponse using tokenBuilderService
        return tokenBuilderService.buildLoginResponse(new TokenUserDTO(
                user.getId(),
                user.getUsername(),
                request.getEmail(),
                roleNames
        ));
    }


}
