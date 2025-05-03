package com.hocinebouarara.order_management.controller;

import com.hocinebouarara.order_management.dto.ProfileDto;
import com.hocinebouarara.order_management.service.ProfileService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
@RequiredArgsConstructor
public class SellerProfileController {

    private final ProfileService profileService;

    @GetMapping
    public ResponseEntity<ProfileDto> getProfile(Authentication authentication) {
        String username = authentication.getName();
        return ResponseEntity.ok(profileService.getProfile(username));
    }

    @PutMapping
    public ResponseEntity<Void> updateProfile(@RequestBody @Valid ProfileDto dto, Authentication authentication) {
        String username = authentication.getName();
        profileService.updateProfile(username, dto);
        return ResponseEntity.ok().build();
    }
}
