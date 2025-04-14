package com.hocinebouarara.order_management.service;

import com.hocinebouarara.order_management.dto.CompanyDTO;

import java.util.List;

public interface CompanyService {

    /**
     * Create a new company.
     * 
     * @param companyDTO The CompanyDTO with the company data.
     * @return The created CompanyDTO.
     */
    CompanyDTO createCompany(CompanyDTO companyDTO);

    /**
     * Update an existing company.
     * 
     * @param companyDTO The CompanyDTO with the updated data.
     * @param companyId  The ID of the company to update.
     * @return The updated CompanyDTO.
     */
    CompanyDTO updateCompany(Long companyId, CompanyDTO companyDTO);

    /**
     * Delete a company by its ID.
     * 
     * @param companyId The ID of the company to delete.
     */
    void deleteCompany(Long companyId);

    /**
     * Get a company by its ID.
     * 
     * @param companyId The ID of the company to retrieve.
     * @return The CompanyDTO of the requested company.
     */
    CompanyDTO getCompanyById(Long companyId);

    /**
     * Get all companies.
     * 
     * @return A list of all companies.
     */
    List<CompanyDTO> getAllCompanies();
}
