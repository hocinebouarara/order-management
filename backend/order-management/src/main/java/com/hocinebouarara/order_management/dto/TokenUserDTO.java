package com.hocinebouarara.order_management.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TokenUserDTO {
    private String username; // اسم المستخدم
    private String email;    // البريد الإلكتروني
    private List<String> roles; // قائمة الأدوار
}
