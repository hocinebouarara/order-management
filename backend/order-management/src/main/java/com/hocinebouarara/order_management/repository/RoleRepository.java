package com.hocinebouarara.order_management.repository;

import com.hocinebouarara.order_management.model.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

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
    // Custom query methods can be added here in the future if needed
}
