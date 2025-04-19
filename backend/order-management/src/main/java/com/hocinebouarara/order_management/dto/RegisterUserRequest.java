package com.hocinebouarara.order_management.dto;

import jakarta.validation.constraints.*;
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

    @NotBlank(message = "Full name is required")
    @Size(min = 2, message = "Full name must be at least 2 characters")
    private String fullName;

    @NotBlank(message = "Username is required")
    @Size(min = 3, message = "Username must be at least 3 characters")
    @Pattern(regexp = "^[a-zA-Z0-9_]+$", message = "Username can only contain letters, numbers, and underscores")
    private String username;

    @NotBlank(message = "Email is required")
    @Email(message = "Email format is invalid")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 8, message = "Password must be at least 8 characters")
    private String password;

    private String confirmPassword;

    @NotNull(message = "User type is required")
    private String userType;



    private String businessName;
    private String address;
    private String phone;
    private String phoneAlt = null;





}
