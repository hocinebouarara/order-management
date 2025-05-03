package com.hocinebouarara.order_management.model.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

/**
 * Represents a confirmation company that manages a team of employees to confirm customer orders.
 * A company can handle orders from multiple sellers and coordinate confirmation processes.
 */
@Entity
@Table(name = "confirmation_companies")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Company {

    /**
     * Unique identifier for the company.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Official name of the confirmation company.
     */
    private String companyName;

    /**
     * Name of the manager or owner of the company.
     */
    private String managerName;

    /**
     * Email address for business communication.
     */
    private String email;

    /**
     * Primary contact phone number.
     */
    private String phone;

    /**
     * Alternate contact phone number.
     */
    private String whatsapp;

    /**
     * Address or Location of the Company.
     */
    private String address;

    private String bio;

    private String profilePicture;

    private String companyLogo;

    /**
     * Timestamp when the company was registered on the system.
     */
    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    /**
     * Timestamp when the company's information was last updated.
     */
    @UpdateTimestamp
    private LocalDateTime updatedAt;

    /**
     * Linked user account to manage access to the platform.
     */
    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;
}
