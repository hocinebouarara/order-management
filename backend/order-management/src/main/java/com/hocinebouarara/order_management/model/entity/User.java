package com.hocinebouarara.order_management.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String status = "active";

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();


    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "user_roles", // اسم الجدول الوسطي
        joinColumns = @JoinColumn(name = "user_id"),  // عمود الربط في جدول المستخدمين
        inverseJoinColumns = @JoinColumn(name = "role_id") // عمود الربط في جدول الأدوار
    )
    private List<Role> roles;
}
