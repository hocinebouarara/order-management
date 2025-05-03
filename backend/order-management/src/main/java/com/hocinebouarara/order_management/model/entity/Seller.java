package com.hocinebouarara.order_management.model.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

/**
 * Represents a seller who can be an individual or a business.
 * Sellers are responsible for listing products, managing orders, and tracking delivery performance.
 */
@Entity
@Table(name = "sellers")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Seller {

    /**
     * Unique identifier for the seller.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Full name of the seller (individual or representative).
     */
    private String fullName;

    /**
     * Main phone number for the shop page or customer service.
     */
    private String phone;

    /**
     * Alternate whatsApp contact number.
     */
    private String whatsApp;

    /**
     * Email address of the seller. remove it
     */
    private String email;

    /**
     *  Address or Location of the seller.
     */
    private String address;

    /**
     *  Url of profile image
     */
    private String profileImage;

    /**
     *  A few word about the user
     */
    private String bio;

    /**
     * Timestamp of seller registration.
     */
    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    /**
     * Timestamp of last profile update.
     */
    @UpdateTimestamp
    private LocalDateTime updatedAt;

    /**
     * The linked user account for login and authentication.
     */
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;


}
