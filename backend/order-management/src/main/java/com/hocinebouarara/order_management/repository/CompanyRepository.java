package com.hocinebouarara.order_management.repository;

import com.hocinebouarara.order_management.model.entity.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repository interface for {@link Company} entity.
 * <p>
 * Provides standard CRUD operations and custom queries for confirmation companies.
 * </p>
 * 
 * @author Hocine
 * @version 1.0
 */
@Repository
public interface CompanyRepository extends JpaRepository<Company, Long> {

    /**
     * Find a confirmation company by the associated user ID.
     *
     * @param userId the ID of the user
     * @return Optional of Company if exists
     */
    Optional<Company> findByUserId(Long userId);

    /**
     * Check if a company exists for the given user ID.
     *
     * @param userId the ID of the user
     * @return true if a company exists
     */
    boolean existsByUserId(Long userId);
}
