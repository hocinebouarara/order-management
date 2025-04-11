package com.hocinebouarara.order_management.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Data Transfer Object (DTO) for transferring Role data between layers.
 * This DTO is used to encapsulate role information such as the ID and name.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoleDTO {

    /**
     * The unique identifier of the role.
     */
    private Long id;

    /**
     * The name or label of the role (e.g., "EMPLOYEE", "MANAGER", "ADMIN").
     */
    private String name;
}
