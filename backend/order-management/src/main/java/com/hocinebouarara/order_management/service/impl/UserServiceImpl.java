package com.hocinebouarara.order_management.service.impl;

import com.hocinebouarara.order_management.dto.RegisterUserRequest;
import com.hocinebouarara.order_management.dto.UserDTO;
import com.hocinebouarara.order_management.mapper.UserMapper;
import com.hocinebouarara.order_management.model.entity.Company;
import com.hocinebouarara.order_management.model.entity.Role;
import com.hocinebouarara.order_management.model.entity.Seller;
import com.hocinebouarara.order_management.model.entity.User;
import com.hocinebouarara.order_management.repository.CompanyRepository;
import com.hocinebouarara.order_management.repository.RoleRepository;
import com.hocinebouarara.order_management.repository.SellerRepository;
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

    private final SellerRepository sellerRepository;

    private final CompanyRepository companyRepository;


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
    @Transactional
    public UserDTO registerUser(RegisterUserRequest request) {
        // 1. Create User entity from request
        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));



        Optional<Role> role = roleRepository.findByName("ROLE_"+request.getUserType().toUpperCase());
        //List<Role> roles = roleRepository.findAllById(request.getRoleIds());
        //System.out.println("ssssssssssssssssssss   :" +roles);

        user.setRoles(role.stream().toList());


        // 2. Save User
        User savedUser = userRepository.save(user);

        // 3. Based on userType, create Seller or Company
        if ("SELLER".equalsIgnoreCase(request.getUserType())) {
            Seller seller = new Seller();
            seller.setUser(savedUser);
            seller.setFullName(request.getUsername());
            seller.setEmail(request.getEmail());
            //seller.setShopName(request.getBusinessName());
           // seller.setWilaya(request.getWilaya());
//            seller.setAddress(request.getAddress());
//            seller.setPhonePage(request.getPhone());
//            seller.setPhoneAlt(request.getPhoneAlt());

            sellerRepository.save(seller);
        } else if ("COMPANY".equalsIgnoreCase(request.getUserType())) {
            Company company = new Company();
            company.setUser(savedUser);
            company.setManagerName(request.getUsername());
            company.setEmail(request.getEmail());
//            company.setName(request.getBusinessName());
//           // company.setWilaya(request.getWilaya());
//            company.setAddress(request.getAddress());
//            company.setPhone(request.getPhone());
//            company.setPhoneAlt(request.getPhoneAlt());

            companyRepository.save(company);
        } else {
            throw new IllegalArgumentException("Invalid userType: " + request.getUserType());
        }

        // 4. Return mapped DTO
        return userMapper.userToUserDTO(savedUser);
    }


}
