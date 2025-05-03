package com.hocinebouarara.order_management.service.impl;

import com.hocinebouarara.order_management.dto.ProfileDto;
import com.hocinebouarara.order_management.exception.MultipleFieldConflictException;
import com.hocinebouarara.order_management.exception.SellerNotFoundException;
import com.hocinebouarara.order_management.exception.UserNotFoundException;
import com.hocinebouarara.order_management.model.entity.Company;
import com.hocinebouarara.order_management.model.entity.Seller;
import com.hocinebouarara.order_management.model.entity.User;
import com.hocinebouarara.order_management.model.enums.UserType;
import com.hocinebouarara.order_management.repository.CompanyRepository;
import com.hocinebouarara.order_management.repository.SellerRepository;
import com.hocinebouarara.order_management.repository.UserRepository;
import com.hocinebouarara.order_management.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ProfileServiceImpl implements ProfileService {

    private final UserRepository userRepository;
    private final SellerRepository sellerRepository;
    private final CompanyRepository companyRepository;

    @Transactional(readOnly = true)
    @Override
    public ProfileDto getProfile(String username) {
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        // التحقق إذا كان المستخدم بائع أو شركة
        Seller seller = sellerRepository.findByUserId(user.getId()).orElse(null);
        Company company = companyRepository.findByUserId(user.getId()).orElse(null);

        if (user.getType() == UserType.SELLER && seller != null) {
            return ProfileDto.builder()
                    .id(user.getId())
                    .fullName(seller.getFullName())
                    .username(user.getUsername())
                    .email(user.getEmail())
                    .phone(seller.getPhone())
                    .whatsapp(seller.getWhatsApp())
                    .address(seller.getAddress())
                    .type(user.getType())
                    .bio(seller.getBio())
                    .profilePicture(seller.getProfileImage())
                    .build();
        } else if (user.getType() == UserType.COMPANY && company != null) {
            return ProfileDto.builder()
                    .id(user.getId())
                    .fullName(company.getManagerName())  // إضافة الحقل المخصص للشركة
                    .username(user.getUsername())
                    .email(user.getEmail())
                    .phone(company.getPhone())
                    .whatsapp(company.getWhatsapp())
                    .address(company.getAddress())
                    .type(user.getType())
                    .companyName(company.getCompanyName())
                    .bio(company.getBio())
                    .profilePicture(company.getProfilePicture())
                    .companyLogo(company.getCompanyLogo())  // إضافة الحقل المخصص للشركة
                    .build();
        } else {
            throw new UserNotFoundException("No profile found for user ID: " + user.getId());
        }

    }


    @Transactional
    @Override
    public void updateProfile(String email, ProfileDto dto) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        Map<String,String> errors = new HashMap<>();

        // التحقق من وجود الأخطاء في الاسم أو البريد
        userRepository.findByUsername(dto.getUsername()).ifPresent(existingUser -> {
            if (!existingUser.getId().equals(user.getId())) {
                errors.put("username", "Username is already taken");
            }
        });

        userRepository.findByEmail(dto.getEmail()).ifPresent(existingUser -> {
            if (!existingUser.getId().equals(user.getId())) {
                errors.put("email", "Email is already in use");
            }
        });

        if (!errors.isEmpty()) {
            throw new MultipleFieldConflictException(errors);
        }

        // التحقق من نوع المستخدم وتحديث البيانات الخاصة به
        if (user.getType() == UserType.SELLER) {
            Seller seller = sellerRepository.findByUserId(user.getId())
                    .orElseThrow(() -> new SellerNotFoundException("Seller not found for user ID: " + user.getId()));

            // تحديث بيانات المستخدم
            user.setUsername(dto.getUsername());
            user.setEmail(dto.getEmail());
            userRepository.save(user);

            // تحديث بيانات البائع
            seller.setFullName(dto.getFullName());
            seller.setPhone(dto.getPhone());
            seller.setWhatsApp(dto.getWhatsapp());
            seller.setAddress(dto.getAddress());
            seller.setBio(dto.getBio());
            seller.setProfileImage(dto.getProfilePicture());
            sellerRepository.save(seller);
        } else if (user.getType() == UserType.COMPANY) {
            Company company = companyRepository.findByUserId(user.getId())
                    .orElseThrow(() -> new UserNotFoundException("Company not found for user ID: " + user.getId()));

            // تحديث بيانات المستخدم
            user.setUsername(dto.getUsername());
            user.setEmail(dto.getEmail());
            userRepository.save(user);

            // تحديث بيانات الشركة
            company.setManagerName(dto.getFullName());
            company.setCompanyName(dto.getCompanyName());
            company.setPhone(dto.getPhone());
            company.setWhatsapp(dto.getWhatsapp());
            company.setAddress(dto.getAddress());
            company.setBio(dto.getBio());
            company.setProfilePicture(dto.getProfilePicture());
            company.setCompanyLogo(dto.getCompanyLogo());
            companyRepository.save(company);
        }
    }

}
