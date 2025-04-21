package com.hocinebouarara.order_management.service.impl;

import com.hocinebouarara.order_management.dto.RoleDTO;
import com.hocinebouarara.order_management.mapper.RoleMapper;
import com.hocinebouarara.order_management.model.entity.Role;
import com.hocinebouarara.order_management.repository.RoleRepository;
import com.hocinebouarara.order_management.service.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Implementation of the RoleService interface.
 * Provides business logic for managing roles within the system.
 */
@Service
@Transactional
@RequiredArgsConstructor
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepository;

    private final RoleMapper roleMapper;

    /**
     * Creates a new role in the system.
     *
     * @param roleDTO the role data to create
     * @return the created role as a RoleDTO
     */
    @Override
    public RoleDTO createRole(RoleDTO roleDTO) {
        Role role = roleMapper.roleDTOToRole(roleDTO);
        Role savedRole = roleRepository.save(role);
        return roleMapper.roleToRoleDTO(savedRole);
    }

    /**
     * Retrieves a role by its unique identifier.
     *
     * @param id the ID of the role
     * @return the role as a RoleDTO
     * @throws RuntimeException if the role is not found
     */
    @Override
    public RoleDTO getRoleById(Long id) {
        Role role = roleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Role not found"));
        return roleMapper.roleToRoleDTO(role);
    }

    /**
     * Deletes a role by its ID.
     *
     * @param id the unique identifier of the role to be deleted.
     */
    @Override
    public void deleteRole(Long id) {

    }


    /**
     * Retrieves a list of all roles in the system.
     *
     * @return a list of RoleDTOs
     */
    @Override
    public List<RoleDTO> getAllRoles() {
        return roleMapper.rolesToRoleDTOs(roleRepository.findAll());
    }

}
