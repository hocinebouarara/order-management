package com.hocinebouarara.order_management.repository;

import com.hocinebouarara.order_management.model.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repository interface for accessing {@link Role} entities from the database.
 * <p>
 * Extends {@link JpaRepository} to provide standard CRUD operations and query methods.
 * </p>
 *
 * Example usage:
 * <pre>
 *     List&lt;Role&gt; allRoles = roleRepository.findAll();
 *     Optional&lt;Role&gt; adminRole = roleRepository.findById(1L);
 * </pre>
 *
 * @author Hocine
 * @version 1.0
 */
@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    /**
     * Retrieves a role by its name.
     *
     * @param name the name of the role to search for
     * @return an {@link Optional} containing the found {@link Role}, or empty if not found
     */
    Optional<Role> findByName(String name);

}
