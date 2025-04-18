package com.hocinebouarara.order_management.dto;

import lombok.*;

import java.time.LocalDateTime;

/**
 * Data Transfer Object for Company entity.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CompanyDTO {

    /**
     * Unique identifier for the company.
     */
    private Long id;

    /**
     * Official name of the confirmation company.
     */
    private String name;

    /**
     * Name of the manager or owner of the company.
     */
    private String managerName;

    /**
     * Primary contact phone number.
     */
    private String phone;

    /**
     * Alternate contact phone number.
     */
    private String phoneAlt;

    /**
     * Email address for business communication.
     */
    private String email;

    /**
     * Current status (e.g. ACTIVE, INACTIVE).
     */
    private String status;

    /**
     * Whether the company is verified by the admin.
     */
    private boolean isVerified;

    /**
     * Timestamp when the company was registered on the system.
     */
    private LocalDateTime createdAt;

    /**
     * Timestamp when the company's information was last updated.
     */
    private LocalDateTime updatedAt;

    /**
     * Linked user account to manage access to the platform.
     */
    private Long userId;  // Referencing the linked User ID.
}
