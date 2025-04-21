package com.hocinebouarara.order_management.service;

import com.hocinebouarara.order_management.dto.RoleDTO;

import java.util.List;

/**
 * Service interface for managing roles in the application.
 * It provides methods to create, update, delete, and retrieve roles.
 */
public interface RoleService {

    /**
     * Creates a new role.
     *
     * @param roleDTO the DTO containing role data.
     * @return the created RoleDTO.
     */
    RoleDTO createRole(RoleDTO roleDTO);

    /**
     * Retrieves all roles.
     *
     * @return a list of RoleDTOs representing all roles.
     */
    List<RoleDTO> getAllRoles();

    /**
     * Retrieves a role by its ID.
     *
     * @param id the unique identifier of the role.
     * @return the RoleDTO representing the role with the specified ID.
     */
    RoleDTO getRoleById(Long id);

    /**
     * Deletes a role by its ID.
     *
     * @param id the unique identifier of the role to be deleted.
     */
    void deleteRole(Long id);

}
