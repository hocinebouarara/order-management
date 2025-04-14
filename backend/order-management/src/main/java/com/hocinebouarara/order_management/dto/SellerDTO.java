package com.hocinebouarara.order_management.dto;

import lombok.*;

import java.time.LocalDateTime;

/**
 * Data Transfer Object for Seller entity.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SellerDTO {

    /**
     * Unique identifier for the seller.
     */
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
     * Whether the seller is verified by the admin.
     */
    private boolean isVerified;

    /**
     * Timestamp of seller registration.
     */
    private LocalDateTime createdAt;

    /**
     * Timestamp of last profile update.
     */
    private LocalDateTime updatedAt;

    /**
     * The linked user account for login and authentication.
     */
    private Long userId;  // Referencing the linked User ID.
}
