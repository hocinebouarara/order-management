package com.hocinebouarara.order_management.controller;

import com.hocinebouarara.order_management.dto.CompanyDTO;
import com.hocinebouarara.order_management.service.CompanyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/companies")
@RequiredArgsConstructor
public class CompanyController {

    private final CompanyService companyService;


    /**
     * Create a new company.
     *
     * @param companyDTO The CompanyDTO to be created.
     * @return The created CompanyDTO.
     */
    @PostMapping
    public ResponseEntity<CompanyDTO> createCompany(@RequestBody CompanyDTO companyDTO) {
        CompanyDTO createdCompany = companyService.createCompany(companyDTO);
        return new ResponseEntity<>(createdCompany, HttpStatus.CREATED);
    }

    /**
     * Update an existing company.
     *
     * @param companyId  The ID of the company to be updated.
     * @param companyDTO The CompanyDTO with updated data.
     * @return The updated CompanyDTO.
     */
    @PutMapping("/{companyId}")
    public ResponseEntity<CompanyDTO> updateCompany(@PathVariable Long companyId, @RequestBody CompanyDTO companyDTO) {
        CompanyDTO updatedCompany = companyService.updateCompany(companyId, companyDTO);
        return new ResponseEntity<>(updatedCompany, HttpStatus.OK);
    }

    /**
     * Delete a company by its ID.
     *
     * @param companyId The ID of the company to be deleted.
     * @return A response indicating the status of the deletion.
     */
    @DeleteMapping("/{companyId}")
    public ResponseEntity<Void> deleteCompany(@PathVariable Long companyId) {
        companyService.deleteCompany(companyId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    /**
     * Get a company by its ID.
     *
     * @param companyId The ID of the company to retrieve.
     * @return The CompanyDTO of the requested company.
     */
    @GetMapping("/{companyId}")
    public ResponseEntity<CompanyDTO> getCompanyById(@PathVariable Long companyId) {
        CompanyDTO company = companyService.getCompanyById(companyId);
        return new ResponseEntity<>(company, HttpStatus.OK);
    }

    /**
     * Get a list of all companies.
     *
     * @return A list of all companies.
     */
    @GetMapping
    public ResponseEntity<List<CompanyDTO>> getAllCompanies() {
        List<CompanyDTO> companies = companyService.getAllCompanies();
        return new ResponseEntity<>(companies, HttpStatus.OK);
    }
}
