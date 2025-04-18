package com.hocinebouarara.order_management.controller;

import com.hocinebouarara.order_management.dto.SellerDTO;
import com.hocinebouarara.order_management.service.SellerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sellers")
@RequiredArgsConstructor
public class SellerController {

    private final SellerService sellerService;

    /**
     * Create a new seller.
     *
     * @param sellerDTO The SellerDTO to be created.
     * @return The created SellerDTO.
     */
    @PostMapping
    public ResponseEntity<SellerDTO> createSeller(@RequestBody SellerDTO sellerDTO) {
        SellerDTO createdSeller = sellerService.createSeller(sellerDTO);
        return new ResponseEntity<>(createdSeller, HttpStatus.CREATED);
    }

    /**
     * Update an existing seller.
     *
     * @param sellerId  The ID of the seller to be updated.
     * @param sellerDTO The SellerDTO with updated data.
     * @return The updated SellerDTO.
     */
    @PutMapping("/{sellerId}")
    public ResponseEntity<SellerDTO> updateSeller(@PathVariable Long sellerId, @RequestBody SellerDTO sellerDTO) {
        SellerDTO updatedSeller = sellerService.updateSeller(sellerId, sellerDTO);
        return new ResponseEntity<>(updatedSeller, HttpStatus.OK);
    }

    /**
     * Delete a seller by its ID.
     *
     * @param sellerId The ID of the seller to be deleted.
     * @return A response indicating the status of the deletion.
     */
    @DeleteMapping("/{sellerId}")
    public ResponseEntity<Void> deleteSeller(@PathVariable Long sellerId) {
        sellerService.deleteSeller(sellerId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    /**
     * Get a seller by its ID.
     *
     * @param sellerId The ID of the seller to retrieve.
     * @return The SellerDTO of the requested seller.
     */
    @GetMapping("/{sellerId}")
    public ResponseEntity<SellerDTO> getSellerById(@PathVariable Long sellerId) {
        SellerDTO seller = sellerService.getSellerById(sellerId);
        return new ResponseEntity<>(seller, HttpStatus.OK);
    }

    /**
     * Get a list of all sellers.
     *
     * @return A list of all sellers.
     */
    @GetMapping
    public ResponseEntity<List<SellerDTO>> getAllSellers() {
        List<SellerDTO> sellers = sellerService.getAllSellers();
        return new ResponseEntity<>(sellers, HttpStatus.OK);
    }
}
