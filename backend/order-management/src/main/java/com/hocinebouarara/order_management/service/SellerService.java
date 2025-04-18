package com.hocinebouarara.order_management.service;

import com.hocinebouarara.order_management.dto.SellerDTO;

import java.util.List;

/**
 * Service interface for managing Sellers.
 * Provides methods for creating, updating, retrieving, and deleting sellers.
 */
public interface SellerService {

    /**
     * Creates a new seller.
     *
     * @param sellerDTO The SellerDTO to be created.
     * @return The created SellerDTO.
     */
    SellerDTO createSeller(SellerDTO sellerDTO);

    /**
     * Updates an existing seller.
     *
     * @param sellerId  The ID of the seller to be updated.
     * @param sellerDTO The SellerDTO containing updated data.
     * @return The updated SellerDTO.
     */
    SellerDTO updateSeller(Long sellerId, SellerDTO sellerDTO);

    /**
     * Deletes a seller by its ID.
     *
     * @param sellerId The ID of the seller to be deleted.
     */
    void deleteSeller(Long sellerId);

    /**
     * Retrieves a seller by its ID.
     *
     * @param sellerId The ID of the seller to retrieve.
     * @return The SellerDTO corresponding to the seller ID.
     */
    SellerDTO getSellerById(Long sellerId);

    /**
     * Retrieves all sellers.
     *
     * @return A list of all SellerDTOs.
     */
    List<SellerDTO> getAllSellers();
}
