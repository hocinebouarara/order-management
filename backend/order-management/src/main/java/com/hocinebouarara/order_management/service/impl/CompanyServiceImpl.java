package com.hocinebouarara.order_management.service.impl;

import com.hocinebouarara.order_management.dto.CompanyDTO;
import com.hocinebouarara.order_management.mapper.CompanyMapper;
import com.hocinebouarara.order_management.model.entity.Company;
import com.hocinebouarara.order_management.repository.CompanyRepository;
import com.hocinebouarara.order_management.service.CompanyService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class CompanyServiceImpl implements CompanyService {

    private final CompanyRepository companyRepository;

    private final CompanyMapper companyMapper;


    @Override
    public CompanyDTO createCompany(CompanyDTO companyDTO) {
        // Convert DTO to entity
        Company company = companyMapper.companyDTOToCompany(companyDTO);
        
        // Save the company to the database
        Company savedCompany = companyRepository.save(company);
        
        // Convert the saved entity back to DTO
        return companyMapper.companyToCompanyDTO(savedCompany);
    }

    @Override
    public CompanyDTO updateCompany(Long companyId, CompanyDTO companyDTO) {
        // Check if company exists
        Company existingCompany = companyRepository.findById(companyId)
                .orElseThrow(() -> new RuntimeException("Company not found"));
        
        // Update the company fields
        existingCompany.setCompanyName(companyDTO.getName());
        existingCompany.setManagerName(companyDTO.getManagerName());
        existingCompany.setPhone(companyDTO.getPhone());
        existingCompany.setWhatsapp(companyDTO.getPhoneAlt());
        existingCompany.setEmail(companyDTO.getEmail());

        
        // Save the updated company
        Company updatedCompany = companyRepository.save(existingCompany);
        
        // Convert the updated entity back to DTO
        return companyMapper.companyToCompanyDTO(updatedCompany);
    }

    @Override
    public void deleteCompany(Long companyId) {
        // Check if company exists
        if (!companyRepository.existsById(companyId)) {
            throw new RuntimeException("Company not found");
        }

        // Delete the company from the database
        companyRepository.deleteById(companyId);
    }

    @Override
    public CompanyDTO getCompanyById(Long companyId) {
        // Fetch the company from the database
        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new RuntimeException("Company not found"));

        // Convert the entity to DTO and return
        return companyMapper.companyToCompanyDTO(company);
    }

    @Override
    public List<CompanyDTO> getAllCompanies() {
        // Fetch all companies from the database
        List<Company> companies = companyRepository.findAll();
        
        // Convert the list of entities to a list of DTOs
        return companies.stream()
                .map(companyMapper::companyToCompanyDTO)
                .collect(Collectors.toList());
    }

}
