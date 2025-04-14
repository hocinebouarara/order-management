package com.hocinebouarara.order_management.repository;

import com.hocinebouarara.order_management.model.entity.Seller;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repository interface for {@link Seller} entity.
 * <p>
 * Provides standard CRUD operations and custom queries for sellers.
 * </p>
 *
 * @author Hocine
 * @version 1.0
 */
@Repository
public interface SellerRepository extends JpaRepository<Seller, Long> {

    /**
     * Find a seller by associated user ID.
     *
     * @param userId the ID of the user
     * @return Optional of Seller if exists
     */
    Optional<Seller> findByUserId(Long userId);

    /**
     * Check if a seller exists for the given user ID.
     *
     * @param userId the ID of the user
     * @return true if a seller exists
     */
    boolean existsByUserId(Long userId);
}
