package com.hocinebouarara.order_management.mapper;

import com.hocinebouarara.order_management.dto.RoleDTO;
import com.hocinebouarara.order_management.model.entity.Role;
import org.mapstruct.Mapper;

import java.util.List;

/**
 * Mapper interface for converting between {@link Role} entity and {@link RoleDTO}.
 * <p>
 * Provides single and bulk conversions using MapStruct.
 * </p>
 *
 * @author Hocine
 * @version 1.0
 */
@Mapper(componentModel = "spring")
public interface RoleMapper {

    /**
     * Converts a {@link Role} entity to its corresponding {@link RoleDTO}.
     *
     * @param role the Role entity to convert
     * @return the mapped RoleDTO
     */
    RoleDTO roleToRoleDTO(Role role);

    /**
     * Converts a {@link RoleDTO} to its corresponding {@link Role} entity.
     *
     * @param roleDTO the RoleDTO to convert
     * @return the mapped Role entity
     */
    Role roleDTOToRole(RoleDTO roleDTO);

    /**
     * Converts a list of {@link Role} entities to a list of {@link RoleDTO}s.
     *
     * @param roles the list of Role entities
     * @return the list of mapped RoleDTOs
     */
    List<RoleDTO> rolesToRoleDTOs(List<Role> roles);

    /**
     * Converts a list of {@link RoleDTO}s to a list of {@link Role} entities.
     *
     * @param roleDTOs the list of RoleDTOs
     * @return the list of mapped Role entities
     */
    List<Role> roleDTOsToRoles(List<RoleDTO> roleDTOs);
}
