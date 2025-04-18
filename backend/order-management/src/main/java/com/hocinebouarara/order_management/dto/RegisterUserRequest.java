package com.hocinebouarara.order_management.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO used to register a new user along with their role(s).
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterUserRequest {

//    fullName: "",
//    username: "",
//    email: "",
//    password: "",
//    confirmPassword: "",
//    userType: undefined,

    private String fullName;

    private String username;

    private String email;

    private String password;

    private String confirmPassword;

    private String userType;


    // business fields
    private String ownerName;
    private String businessName;
    private String address;
    private String phone;
    private String phoneAlt = null;





}
