package com.hocinebouarara.order_management.mapper;

import com.hocinebouarara.order_management.dto.CompanyDTO;
import com.hocinebouarara.order_management.model.entity.Company;
import org.mapstruct.Mapper;

import java.util.List;

/**
 * Mapper interface for converting between {@link Company} entity and {@link CompanyDTO}.
 * <p>
 * Provides methods for converting both single and multiple instances using MapStruct.
 * </p>
 * 
 * @author Hocine
 * @version 1.0
 */
@Mapper(componentModel = "spring")
public interface CompanyMapper {

    /**
     * Converts a {@link Company} entity to a {@link CompanyDTO}.
     *
     * @param company the Company entity
     * @return the mapped CompanyDTO
     */
    CompanyDTO companyToCompanyDTO(Company company);

    /**
     * Converts a {@link CompanyDTO} to a {@link Company} entity.
     *
     * @param companyDTO the CompanyDTO
     * @return the mapped Company entity
     */
    Company companyDTOToCompany(CompanyDTO companyDTO);

    /**
     * Converts a list of {@link Company} entities to a list of {@link CompanyDTO}s.
     *
     * @param companies the list of Company entities
     * @return the list of CompanyDTOs
     */
    List<CompanyDTO> companiesToCompanyDTOs(List<Company> companies);

    /**
     * Converts a list of {@link CompanyDTO}s to a list of {@link Company} entities.
     *
     * @param companyDTOs the list of CompanyDTOs
     * @return the list of Company entities
     */
    List<Company> companyDTOsToCompanies(List<CompanyDTO> companyDTOs);
}
