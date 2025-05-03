package com.hocinebouarara.order_management.dto;

import com.hocinebouarara.order_management.model.enums.UserType;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProfileDto {

    private long id;

    @NotBlank(message = "Full name is required")
    private String fullName;

    @NotBlank(message = "Username is required")
    @Size(min = 4, max = 30, message = "Username must be between 4 and 30 characters")
    private String username;

    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    private String email;

    private String companyName;

    @NotBlank(message = "Phone number is required")
    private String phone;

    private String whatsapp;

    @Size(max = 255, message = "Address is too long")
    private String address;

    @Size(max = 500, message = "Bio is too long")
    private String bio;

    private String profilePicture;

    private UserType type;

    private String companyLogo;

    private boolean isProfileComplete;
}
