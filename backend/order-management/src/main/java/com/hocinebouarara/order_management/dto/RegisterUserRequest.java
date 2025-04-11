package com.hocinebouarara.order_management.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * DTO used to register a new user along with their role(s).
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterUserRequest {

    private String username;
    private String password;
    private String email;
    private List<Long> roleIds; // IDs of roles to assign

}
