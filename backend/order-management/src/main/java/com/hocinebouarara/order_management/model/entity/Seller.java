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
     * The name of the shop or business.
     */
    private String shopName;

    /**
     * Full name of the seller (individual or representative).
     */
    private String fullName;

    /**
     * Main phone number for the shop page or customer service.
     */
    private String phonePage;

    /**
     * Alternate contact number.
     */
    private String phoneAlt;

    /**
     * Email address of the seller.
     */
    private String email;

    /**
     * Wilaya or region of the seller.
     */
    private String wilaya;

    /**
     *  Address or Location of the seller.
     */
    private String address;

    /**
     * Whether the seller is verified by the admin. Default is false
     */
    private boolean isVerified = false;

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
