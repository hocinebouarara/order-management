package com.hocinebouarara.order_management.service.impl;

import com.hocinebouarara.order_management.dto.ProfileDto;
import com.hocinebouarara.order_management.exception.MultipleFieldConflictException;
import com.hocinebouarara.order_management.exception.SellerNotFoundException;
import com.hocinebouarara.order_management.exception.UserNotFoundException;
import com.hocinebouarara.order_management.model.entity.Seller;
import com.hocinebouarara.order_management.model.entity.User;
import com.hocinebouarara.order_management.repository.SellerRepository;
import com.hocinebouarara.order_management.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ProfileServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private SellerRepository sellerRepository;

    @InjectMocks
    private ProfileServiceImpl profileService;

    @Test
    void updateProfile_ShouldUpdateSuccessfully() {
        // Arrange
        User user = new User();
        user.setId(1L);
        user.setUsername("oldUsername");
        user.setEmail("old@example.com");

        Seller seller = new Seller();
        seller.setUser(user);

        ProfileDto dto = ProfileDto.builder()
                .username("newUsername")
                .email("new@example.com")
                .fullName("New Full Name")
                .phone("123456789")
                .whatsapp("987654321")
                .address("New Address")
                .bio("New Bio")
                .profilePicture("newProfile.jpg")
                .build();

        when(userRepository.findByEmail("old@example.com")).thenReturn(Optional.of(user));
        when(userRepository.findByUsername("newUsername")).thenReturn(Optional.empty());
        when(userRepository.findByEmail("new@example.com")).thenReturn(Optional.empty());
        when(sellerRepository.findByUserId(1L)).thenReturn(Optional.of(seller));

        // Act
        profileService.updateProfile("old@example.com", dto);

        // Assert
        assertThat(user.getUsername()).isEqualTo("newUsername");
        assertThat(user.getEmail()).isEqualTo("new@example.com");
        assertThat(seller.getFullName()).isEqualTo("New Full Name");

        verify(userRepository).save(user);
        verify(sellerRepository).save(seller);
    }

    @Test
    void updateProfile_ShouldThrowWhenUsernameExists() {
        // Arrange
        User user = new User();
        user.setId(1L);
        user.setUsername("oldUsername");
        user.setEmail("old@example.com");

        User anotherUser = new User();
        anotherUser.setId(2L); // Different user, conflict

        ProfileDto dto = ProfileDto.builder()
                .username("conflictUsername")
                .email("new@example.com")
                .build();

        when(userRepository.findByEmail("old@example.com")).thenReturn(Optional.of(user));
        when(userRepository.findByUsername("conflictUsername")).thenReturn(Optional.of(anotherUser));

        // Act & Assert
        assertThatThrownBy(() -> profileService.updateProfile("old@example.com", dto))
                .isInstanceOf(MultipleFieldConflictException.class);
    }

    @Test
    void updateProfile_ShouldThrowWhenEmailExists() {
        // Arrange
        User user = new User();
        user.setId(1L);
        user.setUsername("oldUsername");
        user.setEmail("old@example.com");

        User anotherUser = new User();
        anotherUser.setId(2L); // Different user

        ProfileDto dto = ProfileDto.builder()
                .username("newUsername")
                .email("conflict@example.com")
                .build();

        when(userRepository.findByEmail("old@example.com")).thenReturn(Optional.of(user));
        when(userRepository.findByUsername("newUsername")).thenReturn(Optional.empty());
        when(userRepository.findByEmail("conflict@example.com")).thenReturn(Optional.of(anotherUser));

        // Act & Assert
        assertThatThrownBy(() -> profileService.updateProfile("old@example.com", dto))
                .isInstanceOf(MultipleFieldConflictException.class);
    }

    @Test
    void updateProfile_ShouldThrowWhenUserNotFound() {
        // Arrange
        when(userRepository.findByEmail("notfound@example.com")).thenReturn(Optional.empty());

        ProfileDto dto = new ProfileDto();

        // Act & Assert
        assertThatThrownBy(() -> profileService.updateProfile("notfound@example.com", dto))
                .isInstanceOf(UserNotFoundException.class);
    }

    @Test
    void updateProfile_ShouldThrowWhenSellerNotFound() {
        // Arrange
        User user = new User();
        user.setId(1L);

        ProfileDto dto = new ProfileDto();

        when(userRepository.findByEmail("old@example.com")).thenReturn(Optional.of(user));
        when(userRepository.findByUsername(null)).thenReturn(Optional.empty());
        when(userRepository.findByEmail(null)).thenReturn(Optional.empty());
        when(sellerRepository.findByUserId(1L)).thenReturn(Optional.empty());

        // Act & Assert
        assertThatThrownBy(() -> profileService.updateProfile("old@example.com", dto))
                .isInstanceOf(SellerNotFoundException.class);
    }
}
