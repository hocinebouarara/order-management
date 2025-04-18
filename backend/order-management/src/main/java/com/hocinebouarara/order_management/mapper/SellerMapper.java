package com.hocinebouarara.order_management.mapper;

import com.hocinebouarara.order_management.dto.SellerDTO;
import com.hocinebouarara.order_management.model.entity.Seller;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import java.util.List;

/**
 * Mapper interface for converting between {@link Seller} entity and {@link SellerDTO}.
 * <p>
 * Enables single and batch conversions using MapStruct.
 * </p>
 * 
 * @author Hocine
 * @version 1.0
 */
@Mapper(componentModel = "spring")
public interface SellerMapper {

    /**
     * Converts a {@link Seller} entity to a {@link SellerDTO}.
     *
     * @param seller the Seller entity
     * @return the mapped SellerDTO
     */
    SellerDTO sellerToSellerDTO(Seller seller);

    /**
     * Converts a {@link SellerDTO} to a {@link Seller} entity.
     *
     * @param sellerDTO the SellerDTO
     * @return the mapped Seller entity
     */
    Seller sellerDTOToSeller(SellerDTO sellerDTO);

    /**
     * Converts a list of {@link Seller} entities to a list of {@link SellerDTO}s.
     *
     * @param sellers the list of Seller entities
     * @return the list of SellerDTOs
     */
    List<SellerDTO> sellersToSellerDTOs(List<Seller> sellers);

    /**
     * Converts a list of {@link SellerDTO}s to a list of {@link Seller} entities.
     *
     * @param sellerDTOs the list of SellerDTOs
     * @return the list of Seller entities
     */
    List<Seller> sellerDTOsToSellers(List<SellerDTO> sellerDTOs);

    /**
     * Updates an existing Seller entity using information from a SellerDTO.
     *
     * @param sellerDTO the SellerDTO with updated data
     * @param seller the Seller entity to be updated
     */
    void updateEntityFromDto(SellerDTO sellerDTO, @MappingTarget Seller seller);
}
