package com.hocinebouarara.order_management.service.impl;

import com.hocinebouarara.order_management.dto.SellerDTO;
import com.hocinebouarara.order_management.mapper.SellerMapper;
import com.hocinebouarara.order_management.model.entity.Seller;
import com.hocinebouarara.order_management.repository.SellerRepository;
import com.hocinebouarara.order_management.repository.UserRepository;
import com.hocinebouarara.order_management.service.SellerService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Implementation of the SellerService interface.
 * Provides the logic for managing sellers, including CRUD operations.
 */
@Service
@Transactional
@RequiredArgsConstructor
public class SellerServiceImpl implements SellerService {

    private final SellerRepository sellerRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final SellerMapper sellerMapper;


    @Override
    public SellerDTO createSeller(SellerDTO sellerDTO) {
        // Convert SellerDTO to Seller entity
        Seller seller = sellerMapper.sellerDTOToSeller(sellerDTO);
        seller = sellerRepository.save(seller);
        return sellerMapper.sellerToSellerDTO(seller);
    }

    @Override
    public SellerDTO updateSeller(Long sellerId, SellerDTO sellerDTO) {
        // Check if seller exists
        Optional<Seller> existingSellerOpt = sellerRepository.findById(sellerId);
        if (existingSellerOpt.isEmpty()) {
            throw new RuntimeException("Seller not found with id: " + sellerId);
        }

        // Update the seller entity
        Seller existingSeller = existingSellerOpt.get();
        existingSeller.setFullName(sellerDTO.getFullName());
        existingSeller.setPhone(sellerDTO.getPhonePage());
        existingSeller.setWhatsApp(sellerDTO.getPhoneAlt());
        existingSeller.setEmail(sellerDTO.getEmail());

        existingSeller.setUpdatedAt(sellerDTO.getUpdatedAt());

        // Save the updated seller
        existingSeller = sellerRepository.save(existingSeller);
        return sellerMapper.sellerToSellerDTO(existingSeller);
    }

    @Override
    public void deleteSeller(Long sellerId) {
        // Check if seller exists
        Optional<Seller> sellerOpt = sellerRepository.findById(sellerId);
        if (sellerOpt.isEmpty()) {
            throw new RuntimeException("Seller not found with id: " + sellerId);
        }

        // Delete the seller
        sellerRepository.delete(sellerOpt.get());
    }

    @Override
    public SellerDTO getSellerById(Long sellerId) {
        // Retrieve the seller from the database
        Optional<Seller> sellerOpt = sellerRepository.findById(sellerId);
        if (sellerOpt.isEmpty()) {
            throw new RuntimeException("Seller not found with id: " + sellerId);
        }

        // Map the seller entity to DTO
        return sellerMapper.sellerToSellerDTO(sellerOpt.get());
    }

    @Override
    public List<SellerDTO> getAllSellers() {
        // Retrieve all sellers from the database
        List<Seller> sellers = sellerRepository.findAll();

        // Map all seller entities to SellerDTOs
        return sellers.stream()
                .map(sellerMapper::sellerToSellerDTO)
                .collect(Collectors.toList());
    }
}
